import { Check } from "lucide-react";

const MONTHLY = [
  "Daily live trading sessions",
  "Full access to the complete mentorship",
  "One mechanical framework across all markets",
  "Direct mentorship inside the private community",
  "Trade journal & tracking tools",
  "Cancel anytime, no long-term commitment",
];

const LIFETIME = [
  "Lifetime access to the complete mentorship",
  "Daily live trading sessions",
  "One mechanical framework across all markets",
  "Direct mentorship inside the private community",
  "All future course & strategy updates included",
  "Trade journal & tracking tools",
  "Exclusive 1:1 guidance opportunities",
  "One-time payment. Lifetime access.",
];

export default function Pricing() {
  return (
    <section id="pricing" className="container-circuit py-16 sm:py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-circuit-ink sm:text-4xl">
          Choose Your <span className="text-circuit-green-dark">Plan.</span>
        </h2>
        <p className="mt-4 text-base text-circuit-ink/70 sm:text-lg">
          Start your path to profitable trading today.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {/* Monthly */}
        <div className="rounded-3xl border border-black/5 bg-white p-8">
          <h3 className="font-display text-xl font-bold text-circuit-ink">
            Monthly Access
          </h3>
          <p className="mt-4">
            <span className="font-display text-4xl font-bold text-circuit-ink">
              $79
            </span>
            <span className="text-sm text-circuit-ink/50"> /month</span>
          </p>
          <p className="mt-1 text-xs text-circuit-ink/40">Billed in USD</p>

          <ul className="mt-6 space-y-3">
            {MONTHLY.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-circuit-ink/70">
                <Check size={16} className="mt-0.5 shrink-0 text-circuit-green-dark" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 block rounded-full border border-circuit-ink/15 py-3 text-center text-sm font-bold text-circuit-ink transition hover:border-circuit-ink/30"
          >
            Start Monthly Access
          </a>
        </div>

        {/* Lifetime */}
        <div className="relative rounded-3xl border-2 border-circuit-green bg-white p-8">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-circuit-green px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-circuit-ink">
            Most Popular
          </span>
          <h3 className="font-display text-xl font-bold text-circuit-ink">
            Lifetime Mentorship
          </h3>
          <p className="mt-4">
            <span className="font-display text-4xl font-bold text-circuit-ink">
              $399
            </span>
            <span className="text-sm text-circuit-ink/50"> /once-off</span>
          </p>
          <p className="mt-1 text-xs text-circuit-ink/40">
            One time payment &middot; No recurring fees
          </p>

          <ul className="mt-6 space-y-3">
            {LIFETIME.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-circuit-ink/70">
                <Check size={16} className="mt-0.5 shrink-0 text-circuit-green-dark" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 block rounded-full bg-circuit-green py-3 text-center text-sm font-bold text-circuit-ink transition hover:bg-circuit-green-dark hover:text-white"
          >
            Secure Lifetime Access
          </a>
          <p className="mt-3 text-center text-xs font-medium text-red-500">
            Limited spots available to ensure quality mentorship.
          </p>
        </div>
      </div>
    </section>
  );
}
