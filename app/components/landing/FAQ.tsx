"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is this mentorship beginner-friendly?",
    a: "Yes. The mentorship is structured to help traders at every level build a clear understanding of the framework through step-by-step training, live execution, and ongoing guidance.",
  },
  {
    q: "Which markets can I trade using the framework?",
    a: "The model is built to be market-agnostic \u2014 members apply it across forex, indices, crypto, and futures on any timeframe.",
  },
  {
    q: "Are the live trading sessions recorded?",
    a: "Yes. Every live session is recorded and added to the private community so you can review it anytime, even if you miss it live.",
  },
  {
    q: "Do you provide trading signals?",
    a: "No. Trading Circuit teaches one repeatable framework so you can identify and execute your own setups, rather than relying on signals.",
  },
  {
    q: "What makes this mentorship different from others?",
    a: "Direct mentorship, daily live execution, and one mechanical model \u2014 instead of a library of disconnected videos and no accountability.",
  },
  {
    q: "How often are the live trading sessions held?",
    a: "Live sessions run daily across major market opens so you can watch setups form and get executed in real time.",
  },
  {
    q: "Will I continue receiving future updates?",
    a: "Yes. Both plans include future model refinements, strategy updates, and new training material as they're released.",
  },
  {
    q: "Is there a long-term commitment on the monthly plan?",
    a: "No. Monthly Access can be cancelled at any time with no long-term commitment required.",
  },
  {
    q: "Do you offer refunds?",
    a: "Reach out to our support team within 7 days of joining and we'll talk through your situation directly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="container-circuit py-16 sm:py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-circuit-ink sm:text-4xl">
          Frequently Asked{" "}
          <span className="text-circuit-green-dark">Questions</span>
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.q}
              className="rounded-2xl border border-black/5 bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-bold text-circuit-ink sm:text-base">
                  {item.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                    isOpen
                      ? "bg-circuit-green text-circuit-ink"
                      : "bg-circuit-ink text-white"
                  }`}
                >
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
              {isOpen && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-circuit-ink/65">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
