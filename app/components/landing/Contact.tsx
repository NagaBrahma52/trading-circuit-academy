import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="container-circuit pb-16 sm:pb-24">
      <div className="rounded-3xl bg-circuit-ink px-6 py-16 text-center sm:px-12">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-circuit-green text-circuit-ink">
          <Mail size={20} strokeWidth={2.2} />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
          Need <span className="text-circuit-green">Help</span>?
          <br />
          Don&apos;t Hesitate To Contact Us.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/60 sm:text-base">
          We&apos;re here to help. If you have questions, feedback, or need
          support, reach out any time &mdash; your satisfaction is our top
          priority.
        </p>

        <a
          href="mailto:support@tradingcircuit.com"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-circuit-green px-8 py-3.5 text-sm font-bold text-circuit-ink transition hover:bg-circuit-green-dark hover:text-white"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
