const STEPS = [
  {
    n: "01",
    title: "Learn The Framework",
    desc: "Build a clear understanding of one repeatable trading model designed to simplify execution across any market, timeframe, or style. No indicators, no overcomplication.",
  },
  {
    n: "02",
    title: "Join Daily Live Sessions",
    desc: "Watch real trades unfold in live market conditions while learning how high-probability setups are identified, executed, and managed with structure and confidence.",
  },
  {
    n: "03",
    title: "Get Direct Mentorship",
    desc: "Receive ongoing guidance, trade review, and support inside a focused environment built around accountability, structure, and long-term development.",
  },
  {
    n: "04",
    title: "Trade The Circuit With Confidence",
    desc: "Apply the framework through structured execution, mentorship, and performance review designed to build the consistency real trading requires.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-circuit-card/60 py-16 sm:py-24">
      <div className="container-circuit">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-circuit-ink sm:text-4xl">
            Your Path To{" "}
            <span className="text-circuit-green-dark">Profitable</span>{" "}
            Trading.
          </h2>
          <p className="mt-4 text-base text-circuit-ink/70 sm:text-lg">
            A structured, step-by-step mentorship designed to build
            confidence, refine execution, and develop long-term consistency.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex gap-5 rounded-2xl bg-white p-6 shadow-pill"
            >
              <span className="shrink-0 font-display text-4xl font-bold text-circuit-ink/15">
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-circuit-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-circuit-ink/65">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3">
          <a
            href="#pricing"
            className="rounded-full bg-circuit-green px-7 py-3.5 text-sm font-bold text-circuit-ink transition hover:bg-circuit-green-dark hover:text-white"
          >
            Join The Mentorship
          </a>
          <p className="text-xs text-circuit-ink/50">
            Direct mentorship spots are limited to keep quality high.
          </p>
        </div>
      </div>
    </section>
  );
}
