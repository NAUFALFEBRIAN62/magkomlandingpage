import { createFileRoute } from "@tanstack/react-router";
import { KuotaExplorer } from "@/components/landing/KuotaExplorer";
import { TahapanRoad } from "@/components/landing/TahapanRoad";
import { FaqSection } from "@/components/landing/FaqSection";
import {
  DAFTAR_URL,
  LOGIN_URL,
  dokumen,
  persyaratan,
  tahapan,
} from "@/data/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magang Kominfo Sleman 2026 – Pendaftaran MAGKOM" },
      {
        name: "description",
        content: "Daftar magang di Diskominfo Sleman: lihat persyaratan, kuota per bidang, dan tahapan pendaftaran.",
      },
      { property: "og:title", content: "Magang Kominfo Sleman 2026" },
      {
        property: "og:description",
        content: "Persyaratan, kuota per bidang, dan tahapan pendaftaran magang Diskominfo Sleman.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-20 bg-navy text-navy-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-sm font-bold text-navy">
              S
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold tracking-wide">DISKOMINFO SLEMAN</span>
              <span className="block text-[11px] opacity-75">Portal Magang · MAGKOM</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#beranda" className="hover:text-gold">Beranda</a>
            <a href="#kuota" className="hover:text-gold">Kuota</a>
            <a href="#tahapan" className="hover:text-gold">Tahapan</a>
            <a href="#faq" className="hover:text-gold">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={LOGIN_URL} className="rounded-md border border-navy-foreground/60 px-4 py-1.5 text-sm font-semibold text-gold hover:bg-navy-foreground/10">
              Login
            </a>
            <a href={DAFTAR_URL} className="rounded-md bg-background px-4 py-1.5 text-sm font-semibold text-navy hover:bg-secondary">
              Daftar
            </a>
          </div>
        </div>
      </header>

      <section id="beranda" className="mx-auto max-w-6xl px-4 pt-6">
        <div className="grid gap-8 rounded-lg bg-secondary p-8 md:grid-cols-[1.3fr_1fr_1fr] md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Kabupaten Sleman</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              Magang <span className="text-accent">Kominfo</span>
              <br />
              Periode II
            </h1>
            <p className="mt-3 font-display text-2xl font-semibold">
              <span className="tracking-tighter text-accent">»»»»</span> 2026
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Pendaftaran 1–15 Okt 2026 · mulai 2 Nov 2026</p>
            <a href={DAFTAR_URL} className="mt-6 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Daftar Sekarang
            </a>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight">
              Persyaratan <br />
              <span className="text-accent">Umum</span>
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
              {persyaratan.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight">
              Dokumen <br />
              <span className="text-accent">Pendaftaran</span>
            </h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm">
              {dokumen.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="kuota" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-2xl font-semibold">Kuota per Bidang</h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">Jawab dua pertanyaan di bawah untuk melihat kursi yang masih kosong.</p>
        <KuotaExplorer />
      </section>

      <section id="tahapan" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="block h-1 w-28 bg-step-1" />
            <h2 className="mt-5 font-display text-3xl font-normal leading-snug">
              Bingung cara mendaftarnya?, berikut adalah <strong className="font-bold">Tahapan Pendaftaran Magang</strong>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              {tahapan.map((t) => (
                <span key={t.kata} className="block"><strong className="text-foreground">{t.kata}</strong> {t.ringkas}</span>
              ))}
            </p>
            <a href="#" className="mt-8 inline-block rounded-md bg-step-1 px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Unduh Panduan PDF</a>
          </div>
          <TahapanRoad />
        </div>
      </section>

      <FaqSection />

      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm md:grid-cols-3">
          <div>
            <p className="font-display font-semibold">Diskominfo Kabupaten Sleman</p>
            <p className="mt-2 opacity-75">Jl. Parasamya, Beran, Tridadi, Sleman, D.I. Yogyakarta</p>
          </div>
          <div className="opacity-75">
            <p>Email: kominfo@slemankab.go.id</p>
            <p>Telp: (0274) 868405</p>
          </div>
          <p className="opacity-75 md:text-right">© 2026 Diskominfo Sleman</p>
        </div>
      </footer>
    </div>
  );
}
