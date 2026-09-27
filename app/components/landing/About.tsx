import { LineChart } from "lucide-react";
import Reveal from "./Reveal";

const STATS = [
  { value: "6+", label: "Years Trading Experience" },
  { value: "5k+", label: "Community Members" },
  { value: "1k", label: "E-books Sold" },
  { value: "2.5k+", label: "Combined Students" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-circuit-border py-16 sm:py-24">
      <div className="container-circuit">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-circuit-border bg-gradient-to-br from-circuit-card via-black to-black">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(140,255,46,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(140,255,46,0.15) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-circuit-green/20 blur-[80px]"
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-circuit-green/30 bg-black/40 text-circuit-green shadow-glow">
                  <LineChart size={30} strokeWidth={1.6} />
                </span>
                <p className="text-xs font-medium uppercase tracking-widest text-white/30">
                  Trading Circuit Desk
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              About
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Trusted by over{" "}
              <span className="text-circuit-green">300,000</span> traders
              across all socials.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base">
              With over 6+ years of market experience, my journey has
              involved testing multiple strategies, refining ideas, and
              learning through real market conditions. Each phase taught me
              what fails, what survives, and what produces consistency.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
              That process led me to develop my own trading edge built on
              clarity, structure, and practiced execution. Having gone
              through the full cycle as a trader, I know how to guide others
              toward a more disciplined and profitable approach.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-circuit-border pt-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/45 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
