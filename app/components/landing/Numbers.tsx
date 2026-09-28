import { Activity } from "lucide-react";
import Reveal from "./Reveal";

const ORBIT_AVATARS = [
  { top: "2%", left: "48%", size: 38, from: "#8CFF2E", to: "#3F8F12", initial: "R" },
  { top: "16%", left: "80%", size: 46, from: "#60A5FA", to: "#1D4ED8", initial: "S" },
  { top: "50%", left: "94%", size: 40, from: "#F472B6", to: "#BE185D", initial: "M" },
  { top: "82%", left: "78%", size: 36, from: "#FBBF24", to: "#B45309", initial: "K" },
  { top: "90%", left: "40%", size: 42, from: "#F472B6", to: "#9D174D", initial: "T" },
  { top: "58%", left: "4%", size: 42, from: "#93C5FD", to: "#1E40AF", initial: "P" },
  { top: "20%", left: "10%", size: 32, from: "#E5E7EB", to: "#6B7280", initial: "J" },
];

export default function Numbers() {
  return (
    <section className="relative overflow-hidden border-b border-circuit-border py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-circuit-green/10 to-transparent"
      />
      <div className="container-circuit relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Be part of our numbers
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              Gain access to elite funding, cutting-edge tools, and the
              support of a whole community dedicated to your growth.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#plans"
                className="rounded-md bg-circuit-green px-6 py-3 text-sm font-semibold text-black transition hover:bg-circuit-green-dark"
              >
                Available Plans
              </a>
              <a
                href="https://t.me/Wealth_Engr"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                Join our Telegram
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              {/* Rotating rings + avatars */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
                <div className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
                {ORBIT_AVATARS.map((a, i) => (
                  <span
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: a.top, left: a.left, width: a.size, height: a.size }}
                  >
                    {/* counter-rotate so the initial stays upright while orbiting */}
                    <span
                      className="animate-spin-slow-reverse flex h-full w-full items-center justify-center rounded-full border-2 border-black text-[11px] font-bold text-black shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
                    >
                      {a.initial}
                    </span>
                  </span>
                ))}
              </div>

              {/* Static centered logo */}
              <div className="absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-circuit-green shadow-glow">
                <Activity size={26} className="text-black" strokeWidth={2.4} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
