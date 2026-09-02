import { ArrowRight, TrendingUp, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="container-circuit pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-circuit-ink/70 shadow-pill">
            A Repeatable Framework, Not A Signal Group
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-circuit-ink sm:text-5xl lg:text-6xl">
            Complete The{" "}
            <span className="text-circuit-green-dark">Circuit.</span>
            <br />
            Trade With Confidence.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-circuit-ink/70 sm:text-lg">
            A live trading mentorship built around daily execution, direct
            guidance, and one mechanical framework that closes the loop
            between learning and trading &mdash; on any market, any timeframe.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="flex items-center gap-2 rounded-full bg-circuit-green px-7 py-3.5 text-sm font-bold text-circuit-ink shadow-pill transition hover:bg-circuit-green-dark hover:text-white"
            >
              Join The Circuit
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#process"
              className="rounded-full border border-circuit-ink/15 bg-white px-7 py-3.5 text-sm font-bold text-circuit-ink transition hover:border-circuit-ink/30"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2 font-semibold text-circuit-ink">
              <TrendingUp size={16} className="text-circuit-green-dark" />
              500+ Members
            </span>
            <span className="flex items-center gap-2 font-semibold text-circuit-ink">
              <Star size={16} className="text-circuit-green-dark" fill="currentColor" />
              4.8/5 Rating
            </span>
          </div>
        </div>

        {/* Signature visual: circuit-trace trading terminal */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 hidden rounded-[2rem] bg-circuit-green/10 sm:block" />
          <div className="relative overflow-hidden rounded-3xl bg-circuit-ink p-5 shadow-2xl sm:p-7">
            <CircuitTraces />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-circuit-green" />
                <span className="font-display text-sm font-semibold text-white/90">
                  XAUUSD &middot; Live Session
                </span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-circuit-green">
                Live
              </span>
            </div>

            <div className="relative mt-6">
              <CandlestickChart />
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              <Stat label="Win Rate" value="71%" />
              <Stat label="Avg R:R" value="1:2.4" />
              <Stat label="Setups / wk" value="12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-white/40">
        {label}
      </p>
    </div>
  );
}

function CircuitTraces() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 40 H120 V10 H260 M260 10 V70 H400"
        stroke="#3FE05C"
        strokeWidth="1.5"
      />
      <path
        d="M0 260 H90 V300"
        stroke="#3FE05C"
        strokeWidth="1.5"
      />
      <path
        d="M400 230 H300 V180 H180"
        stroke="#3FE05C"
        strokeWidth="1.5"
      />
      <circle cx="120" cy="40" r="4" fill="#3FE05C" />
      <circle cx="260" cy="70" r="4" fill="#3FE05C" />
      <circle cx="90" cy="260" r="4" fill="#3FE05C" />
      <circle cx="180" cy="180" r="4" fill="#3FE05C" />
    </svg>
  );
}

const CANDLES = [
  { h: 40, body: 18, up: true },
  { h: 55, body: 26, up: true },
  { h: 35, body: 14, up: false },
  { h: 65, body: 32, up: true },
  { h: 48, body: 20, up: false },
  { h: 70, body: 38, up: true },
  { h: 58, body: 22, up: true },
  { h: 42, body: 16, up: false },
  { h: 75, body: 40, up: true },
  { h: 60, body: 28, up: true },
  { h: 50, body: 20, up: false },
  { h: 80, body: 44, up: true },
];

function CandlestickChart() {
  return (
    <div className="flex h-40 items-end gap-2 sm:h-48">
      {CANDLES.map((c, i) => (
        <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
          <div
            className="w-px bg-white/25"
            style={{ height: `${c.h - c.body}px` }}
          />
          <div
            className={`w-full rounded-[2px] ${
              c.up ? "bg-circuit-green" : "bg-white/30"
            }`}
            style={{ height: `${c.body}px` }}
          />
        </div>
      ))}
    </div>
  );
}
