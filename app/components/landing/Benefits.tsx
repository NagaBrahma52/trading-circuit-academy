import {
  Radio,
  Repeat,
  GraduationCap,
  BarChart3,
  Users,
  RefreshCw,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Radio,
    title: "Live Trading Sessions",
    desc: "Trade live alongside a professional trader every session and see exactly how high-probability setups get executed.",
  },
  {
    icon: Repeat,
    title: "One Repeatable Framework",
    desc: "Learn a single mechanical model built to work across any asset, timeframe, or market condition.",
  },
  {
    icon: GraduationCap,
    title: "Structured Course Material",
    desc: "Step-by-step training focused on clarity, execution, and long-term trader development.",
  },
  {
    icon: BarChart3,
    title: "Execution Review & Journaling",
    desc: "Refine decision-making, spot weaknesses early, and build consistency through structured review.",
  },
  {
    icon: Users,
    title: "Private Circuit Community",
    desc: "A focused mentorship environment built around discipline, accountability, and structured growth.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Updates",
    desc: "Keep receiving future model refinements, strategy updates, and new training material over time.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="container-circuit py-16 sm:py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-circuit-ink sm:text-4xl">
          Built To Develop{" "}
          <span className="text-circuit-green-dark">Consistent</span> Traders.
        </h2>
        <p className="mt-4 text-base text-circuit-ink/70 sm:text-lg">
          Every part of the mentorship closes the loop between what you learn
          and how you actually trade.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-pill"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-circuit-ink text-circuit-green">
              <b.icon size={20} strokeWidth={2.2} />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-circuit-ink">
              {b.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-circuit-ink/65">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
