import Reveal from "./Reveal";

const RESULTS = [
  {
    name: "Sudheer",
    handle: "Verified Member",
    quote:
      "I'd tried a lot of confusing courses before this. The framework here is the first thing that actually clicked — simple, structured, and easy to follow.",
  },
  {
    name: "Srikanth",
    handle: "Verified Member",
    quote:
      "The live sessions are what sold me. Watching setups get executed in real time made everything I'd read about actually make sense.",
  },
  {
    name: "Manikanta",
    handle: "Verified Member",
    quote:
      "The most comprehensive and easy to follow mentorship I've been part of. The structure and review process pushed my consistency further than anything else has.",
  },
  {
    name: "Sidda Reddy",
    handle: "Verified Member",
    quote:
      "One repeatable model across every market instead of juggling ten indicators. That alone changed how I approach every session.",
  },
  {
    name: "Kailash",
    handle: "Verified Member",
    quote:
      "The private community keeps me accountable. Trade review inside the circuit caught habits I didn't even know I had.",
  },
  {
    name: "Taruni",
    handle: "Verified Member",
    quote:
      "Lifetime access with ongoing updates made this an easy decision. Still one of the best trading investments I've made.",
  },
];

export default function ClientResults() {
  return (
    <section id="results" className="border-b border-circuit-border py-16 sm:py-24">
      <div className="container-circuit text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Clients Results
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 sm:text-base">
            Real testimonials and results from our successful clients.
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 100} className="mb-4 break-inside-avoid">
              <div className="rounded-2xl border border-circuit-border bg-circuit-card p-5 text-left">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-circuit-green/30 to-circuit-green/5 text-xs font-bold text-circuit-green">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white/85">{r.name}</p>
                    <p className="text-xs text-white/40">{r.handle}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {r.quote}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
