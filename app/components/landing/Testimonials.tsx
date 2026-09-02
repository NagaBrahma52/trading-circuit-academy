import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sudheer",
    handle: "Verified Member",
    stars: 5,
    quote:
      "I'd tried a lot of confusing courses before this. The framework here is the first thing that actually clicked \u2014 simple, structured, and easy to follow.",
  },
  {
    name: "Srikanth",
    handle: "Verified Member",
    stars: 5,
    quote:
      "The live sessions are what sold me. Watching setups get executed in real time made everything I'd read about actually make sense.",
  },
  {
    name: "Manikanta",
    handle: "Verified Member",
    stars: 5,
    quote:
      "The most comprehensive and easy to follow mentorship I've been part of. The structure and review process pushed my consistency further than anything else has.",
  },
  {
    name: "Sidda Reddy",
    handle: "Verified Member",
    stars: 5,
    quote:
      "One repeatable model across every market instead of juggling ten indicators. That alone changed how I approach every session.",
  },
  {
    name: "Kailash",
    handle: "Verified Member",
    stars: 5,
    quote:
      "The private community keeps me accountable. Trade review inside the circuit caught habits I didn't even know I had.",
  },
  {
    name: "Taruni",
    handle: "Verified Member",
    stars: 5,
    quote:
      "Lifetime access with ongoing updates made this an easy decision. Still one of the best trading investments I've made.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-circuit-card/60 py-16 sm:py-24">
      <div className="container-circuit">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-circuit-ink sm:text-4xl">
            Real Traders. Real{" "}
            <span className="text-circuit-green-dark">Progress.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-circuit-ink/70 sm:text-lg">
            See how traders inside the circuit are building confidence,
            refining execution, and developing real consistency.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-black/5 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-circuit-ink font-display text-sm font-bold text-circuit-green">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold text-circuit-ink">
                    {t.name}
                  </p>
                  <p className="text-xs text-circuit-ink/45">{t.handle}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-circuit-green-dark"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-circuit-ink/70">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
