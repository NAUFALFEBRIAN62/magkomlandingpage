import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Code2, Lock, Mail, Sigma } from "lucide-react";
import { DAFTAR_URL, bidangList, bulanList, kuota, statusKuota, type Bulan, type Jenjang } from "@/data/landing";

const bulanPanjang: Record<Bulan, string> = { Nov: "November 2026", Des: "Desember 2026", Jan: "Januari 2027" };
const ikon: Record<string, typeof Code2> = { aptika: Code2, statistik: Sigma, sandi: Lock, sekretariat: Mail };

const status = {
  tersedia: { label: "Masih banyak", text: "text-success", bg: "bg-success/10", bar: "bg-success" },
  hampir: { label: "Tinggal sedikit", text: "text-warning", bg: "bg-warning/15", bar: "bg-warning" },
  penuh: { label: "Penuh", text: "text-muted-foreground", bg: "bg-muted", bar: "bg-muted-foreground" },
};

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border px-5 py-2.5 text-base font-semibold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"}`}
    >
      {children}
    </button>
  );
}

export function KuotaExplorer() {
  const [jenjang, setJenjang] = useState<Jenjang>("smk");
  const [bulan, setBulan] = useState<Bulan>("Nov");
  const data = kuota[jenjang][bulan];
  const rows = bidangList
    .map((b) => ({ b, s: data[b.id] ?? { sisa: 0, total: 0 } }))
    .sort((x, y) => y.s.sisa / (y.s.total || 1) - x.s.sisa / (x.s.total || 1));
  const sisa = rows.reduce((a, r) => a + r.s.sisa, 0);
  const total = rows.reduce((a, r) => a + r.s.total, 0) || 1;
  const C = 2 * Math.PI * 52;
  const label = jenjang === "smk" ? "SMK" : "Mahasiswa";
  const track = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);
  const cek = () => {
    const el = track.current;
    if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(cek, [jenjang, bulan]);
  const geser = (dir: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 font-semibold">1. Kamu siapa?</p>
          <div className="flex gap-2">
            <Pill active={jenjang === "smk"} onClick={() => setJenjang("smk")}>Siswa SMK</Pill>
            <Pill active={jenjang === "mahasiswa"} onClick={() => setJenjang("mahasiswa")}>Mahasiswa</Pill>
          </div>
        </div>
        <div>
          <p className="mb-2 font-semibold">2. Mau mulai kapan?</p>
          <div className="flex flex-wrap gap-2">
            {bulanList.map((b) => <Pill key={b} active={bulan === b} onClick={() => setBulan(b)}>{bulanPanjang[b]}</Pill>)}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 rounded-lg bg-navy p-6 text-navy-foreground sm:flex-row">
        <div className="relative shrink-0">
          <svg width="110" height="110" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="12" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--gold)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - sisa / total)} className="transition-[stroke-dashoffset] duration-700" />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-3xl font-bold">{sisa}</span>
        </div>
        <p className="text-lg">
          Ada <strong className="text-gold">{sisa} kursi kosong</strong> dari {total} kursi untuk {label} yang mulai {bulanPanjang[bulan]}.
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button aria-label="Geser kiri" disabled={!canL} onClick={() => geser(-1)} className="grid h-10 w-10 place-items-center rounded-full border bg-background hover:bg-secondary disabled:opacity-30"><ChevronLeft size={20} /></button>
        <button aria-label="Geser kanan" disabled={!canR} onClick={() => geser(1)} className="grid h-10 w-10 place-items-center rounded-full border bg-background hover:bg-secondary disabled:opacity-30"><ChevronRight size={20} /></button>
      </div>
      <div ref={track} onScroll={cek} className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3">
        {rows.map(({ b, s }) => {
          const st = status[statusKuota(s)];
          const Icon = ikon[b.id] ?? Code2;
          const penuh = s.sisa <= 0;
          return (
            <article key={b.id} className={`flex shrink-0 basis-[85%] snap-start flex-col rounded-lg border bg-card p-5 md:basis-[40%] ${penuh ? "opacity-75" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-secondary text-primary"><Icon size={22} /></span>
                <h3 className="flex-1 font-display text-lg font-semibold">{b.nama}</h3>
                <span className={`rounded px-2.5 py-1 text-sm font-semibold ${st.bg} ${st.text}`}>{st.label}</span>
              </div>
              <p className="mt-4">
                <span className="font-display text-3xl font-bold">{s.sisa}</span>{" "}
                <span className="font-semibold">kursi tersisa</span>{" "}
                <span className="text-sm text-muted-foreground">dari {s.total} kursi</span>
              </p>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className={`h-full rounded-full transition-all duration-700 ${st.bar}`} style={{ width: `${(s.sisa / (s.total || 1)) * 100}%` }} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{b.kegiatan}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-sm font-semibold">Jurusan:</span>
                {b.jurusan.map((j) => <span key={j} className="rounded bg-secondary px-2 py-0.5 text-sm">{j}</span>)}
              </div>
              <div className="mt-5 pt-1">
                {penuh ? (
                  <a href={DAFTAR_URL} className="inline-block rounded-md border px-4 py-2 text-sm font-semibold hover:bg-secondary">Masuk daftar tunggu</a>
                ) : (
                  <a href={DAFTAR_URL} className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Daftar</a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        {Object.values(status).map((s) => (
          <span key={s.label} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${s.bar}`} />{s.label}</span>
        ))}
      </div>
    </div>
  );
}
