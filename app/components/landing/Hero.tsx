import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-circuit-border pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      <div className="container-circuit relative text-center">
        <Reveal>
          <div className="mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-circuit-green/30 shadow-[0_0_32px_rgba(140,255,46,0.12)]">
            <Image
              src="/market-truth-banner.jpg"
              alt="The ultimate market truth: a trading system and discipline create opportunity"
              width={1024}
              height={341}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </Reveal>

        <Reveal>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            Master the Market
            <br />
            with <span className="text-circuit-green">Trading Circuit.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            A complete trading education built on structure and logic. Learn
            through the E-book. Improve through mentorship.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

        {/* Signature visual: circuit-trace trading terminal (original hero card) */}
        {/* <Reveal delay={150} className="relative mx-auto mt-16 max-w-xl">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 hidden rounded-[2rem] bg-circuit-green/10 blur-2xl sm:block"
          />
          <div className="relative overflow-hidden rounded-3xl border border-circuit-border bg-circuit-card p-5 text-left shadow-2xl sm:p-7">
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
        </Reveal> */}
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
      <path d="M0 40 H120 V10 H260 M260 10 V70 H400" stroke="#8CFF2E" strokeWidth="1.5" />
      <path d="M0 260 H90 V300" stroke="#8CFF2E" strokeWidth="1.5" />
      <path d="M400 230 H300 V180 H180" stroke="#8CFF2E" strokeWidth="1.5" />
      <circle cx="120" cy="40" r="4" fill="#8CFF2E" />
      <circle cx="260" cy="70" r="4" fill="#8CFF2E" />
      <circle cx="90" cy="260" r="4" fill="#8CFF2E" />
      <circle cx="180" cy="180" r="4" fill="#8CFF2E" />
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
          <div className="w-px bg-white/25" style={{ height: `${c.h - c.body}px` }} />
          <div
            className={`w-full rounded-[2px] ${c.up ? "bg-circuit-green" : "bg-white/30"}`}
            style={{ height: `${c.body}px` }}
          />
        </div>
      ))}
    </div>
  );
}
