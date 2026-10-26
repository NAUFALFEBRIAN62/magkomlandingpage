import { useEffect, useRef, useState } from "react";
import { Briefcase, FileCheck2, Flag, GraduationCap, UserPlus } from "lucide-react";
import { tahapan } from "@/data/landing";

const H = 210;
const stepVar = ["var(--step-1)", "var(--step-2)", "var(--step-3)", "var(--step-4)"];
const icons = [UserPlus, FileCheck2, Briefcase, GraduationCap];
const total = tahapan.length * H;
const T = 80;
const B = 80;
const cpY = (i: number) => i * H + 105;

const d =
  `M40 ${-T} L40 0 ` +
  tahapan
    .map((_, i) => {
      const y = i * H;
      return `L40 ${y + 40} C40 ${y + 75} 120 ${y + 60} 120 ${y + 105} S40 ${y + 135} 40 ${y + 170} L40 ${y + H}`;
    })
    .join(" ") +
  ` L40 ${total + B}`;

export function TahapanRoad() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1);
  const [p, setP] = useState(0);
  const [car, setCar] = useState({ x: 40, y: 0, a: 90 });
  const [cpLen, setCpLen] = useState<number[]>([]);

  useEffect(() => {
    const el = path.current!;
    const L = el.getTotalLength();
    setLen(L);
    // find length at each checkpoint (y is monotonic along the path)
    setCpLen(
      tahapan.map((_, i) => {
        let lo = 0, hi = L;
        for (let k = 0; k < 30; k++) {
          const mid = (lo + hi) / 2;
          if (el.getPointAtLength(mid).y < cpY(i)) lo = mid; else hi = mid;
        }
        return lo;
      }),
    );
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.current!.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
        const at = prog * L;
        const pt = el.getPointAtLength(at);
        const pt2 = el.getPointAtLength(Math.min(L, at + 1));
        const pt0 = el.getPointAtLength(Math.max(0, at - 1));
        const a = (Math.atan2(pt2.y - pt0.y, pt2.x - pt0.x) * 180) / Math.PI;
        setP(prog);
        setCar({ x: pt.x, y: pt.y, a });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const at = p * len;
  const active = (i: number) => cpLen.length > 0 && at >= (cpLen[i] ?? Infinity) - 4;

  const goTo = (i: number) => {
    const r = wrap.current!.getBoundingClientRect();
    const t = (cpLen[i] ?? 0) / len;
    window.scrollTo({ top: window.scrollY + r.top - (window.innerHeight * 0.6 - t * r.height), behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="relative">
      <svg width="170" height={total + T + B} viewBox={`0 ${-T} 170 ${total + T + B}`} className="absolute left-0 top-0 overflow-visible">
        <defs>
          <linearGradient id="roadGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={total}>
            {stepVar.map((c, i) => [
              <stop key={`a${i}`} offset={i / 4} stopColor={c} />,
              <stop key={`b${i}`} offset={(i + 1) / 4} stopColor={c} />,
            ])}
          </linearGradient>
        </defs>
        <path d={d} fill="none" stroke="var(--border)" strokeWidth="44" />
        <path d={d} fill="none" stroke="url(#roadGrad)" strokeWidth="44" strokeDasharray={len} strokeDashoffset={len - at} />
        <path ref={path} d={d} fill="none" stroke="var(--road)" strokeWidth="34" />
        <path d={d} fill="none" stroke="var(--road-line)" strokeWidth="2.5" strokeDasharray="10 9" />
        {tahapan.map((t, i) => {
          const Icon = icons[i]!;
          const on = active(i);
          return (
            <g key={t.judul} onClick={() => goTo(i)} className="cursor-pointer" aria-label={t.judul} role="button">
              <circle cx="120" cy={cpY(i)} r={on ? 34 : 26} fill={stepVar[i]} opacity={on ? 0.25 : 0} className="transition-all duration-500" />
              <circle cx="120" cy={cpY(i)} r="26" fill={on ? stepVar[i] : "var(--background)"} stroke={stepVar[i]} strokeWidth="3" className="transition-colors duration-500" />
              <Icon x={108} y={cpY(i) - 12} width={24} height={24} color={on ? "var(--background)" : stepVar[i]} strokeWidth={2.2} />
            </g>
          );
        })}
        <g aria-label="Start">
          <circle cx="40" cy={-T + 8} r="22" fill="var(--success)" opacity="0.2" />
          <line x1="78" y1={-T + 4} x2="78" y2={-T + 44} stroke="var(--foreground)" strokeWidth="2.5" />
          <Flag x={76} y={-T + 2} width={26} height={26} color="var(--success)" fill="var(--success)" strokeWidth={2} />
          <text x="108" y={-T + 22} className="font-display" fontSize="14" fontWeight="700" fill="var(--success)">START</text>
        </g>
        <g aria-label="Finish" className="transition-all duration-500" style={{ opacity: p >= 0.98 ? 1 : 0.55 }}>
          {p >= 0.98 && <circle cx="96" cy={total + B - 32} r="30" fill="var(--foreground)" opacity="0.12" />}
          <line x1="78" y1={total + B - 50} x2="78" y2={total + B - 4} stroke="var(--foreground)" strokeWidth="2.5" />
          {[0, 1, 2, 3].flatMap((c) => [0, 1, 2].map((r) => (
            <rect key={`${c}${r}`} x={79 + c * 7} y={total + B - 50 + r * 7} width="7" height="7" fill={(c + r) % 2 ? "var(--background)" : "var(--foreground)"} stroke="var(--foreground)" strokeWidth="0.5" />
          )))}
          <text x="112" y={total + B - 32} className="font-display" fontSize="14" fontWeight="700" fill="var(--foreground)">FINISH</text>
        </g>
        <g transform={`translate(${car.x} ${car.y}) rotate(${car.a})`} style={{ filter: "drop-shadow(0 2px 2px rgb(0 0 0 / 0.35))" }}>
          <rect x="-15" y="-9" width="30" height="18" rx="6" fill="var(--navy)" />
          <rect x="3" y="-7" width="7" height="14" rx="2" fill="var(--gold)" />
          <rect x="-11" y="-7" width="5" height="14" rx="2" fill="var(--gold)" opacity="0.6" />
          <rect x="12" y="-8" width="3" height="4" rx="1" fill="var(--road-line)" />
          <rect x="12" y="4" width="3" height="4" rx="1" fill="var(--road-line)" />
        </g>
      </svg>
      <ol style={{ paddingTop: T, paddingBottom: B }}>
        {tahapan.map((t, i) => (
          <li key={t.judul} style={{ height: H }} className="flex items-center pl-[180px]">
            <button
              onClick={() => goTo(i)}
              className={`relative w-full max-w-sm rounded-md bg-secondary p-5 text-left transition-all duration-500 ${active(i) ? "translate-x-0 opacity-100 shadow-md" : "translate-x-4 opacity-40"}`}
            >
              <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45" style={{ background: stepVar[i] }} />
              <p className="font-display text-3xl font-bold leading-none" style={{ color: stepVar[i] }}>{`0${i + 1}`}</p>
              <h3 className="mt-1 font-display text-sm font-semibold uppercase tracking-wider">{t.judul}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.isi}</p>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
