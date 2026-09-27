"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, ShoppingCart, Check } from "lucide-react";
import Reveal from "./Reveal";

const FEATURES = [
  "Full Trading Course",
  "Proven trading framework and strategy",
  "Market Breakdown & Weekly Analysis",
  "Live mentorship classes with real-market breakdowns",
  "Recorded sessions for replay access",
  "Trading Psychology & Risk Management Training",
  "24/7 support",
];

export default function AvailablePlans() {
  const [tab, setTab] = useState<"ebook" | "mentorship">("mentorship");

  return (
    <section id="plans" className="border-b border-circuit-border py-16 sm:py-24">
      <div className="container-circuit text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Available Plans
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 sm:text-base">
            Scale your trading journey, select from our available plans
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-1 rounded-lg border border-circuit-border bg-circuit-card p-1">
            <button
              onClick={() => setTab("ebook")}
              className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                tab === "ebook"
                  ? "bg-circuit-green text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <BookOpen size={15} />
              Forex E-book
            </button>
            <button
              onClick={() => setTab("mentorship")}
              className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                tab === "mentorship"
                  ? "bg-circuit-green text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <GraduationCap size={15} />
              Mentorship
            </button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-6 text-left sm:grid-cols-2">
            {/* E-book card */}
            <div className="flex h-full flex-col rounded-2xl border border-circuit-border bg-circuit-card p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-snug text-white">
                  Premium Value
                  <br />
                  Packed E-book
                </p>
                <a
                  href="#"
                  className="shrink-0 whitespace-nowrap text-xs font-medium text-white/40 hover:text-white/70"
                >
                  See all &rarr;
                </a>
              </div>

              <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-white via-white to-neutral-200">
                <div className="flex h-32 w-24 flex-col items-center justify-center gap-1 rounded-sm bg-gradient-to-b from-[#3b3316] to-[#1a1608] p-2 text-center shadow-xl ring-1 ring-black/10">
                  <p className="text-[8px] font-bold uppercase leading-tight tracking-wide text-circuit-green">
                    The Smart Money Secrets
                  </p>
                  <span className="my-1 h-px w-8 bg-circuit-green/40" />
                  <p className="text-[6px] uppercase leading-snug tracking-wide text-white/50">
                    A Complete Guide to Market Mastery
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-1 items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-snug text-white">
                  The Smart Money Secrets
                  <br />
                  <span className="text-white/50">(Vol 1)</span>
                </p>
                <p className="font-display text-xl font-bold text-circuit-green">
                  $30
                </p>
              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-circuit-green py-3 text-sm font-semibold text-black transition hover:bg-circuit-green-dark">
                <ShoppingCart size={15} />
                Buy
              </button>
            </div>

            {/* Mentorship card */}
            <div className="flex h-full flex-col rounded-2xl border border-circuit-border bg-circuit-card p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  Trading Circuit Academy
                </p>
                <span className="shrink-0 rounded-full bg-circuit-green/15 px-3 py-1 text-[11px] font-semibold text-circuit-green">
                  Recommended
                </span>
              </div>

              <p className="mt-4">
                <span className="font-display text-3xl font-bold text-circuit-green">
                  $500
                </span>
                <span className="ml-1 text-xs text-white/40">
                  Billed Annually
                </span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-circuit-border pt-5">
                {FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-white/70"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-circuit-green" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-circuit-green py-3 text-sm font-semibold text-black transition hover:bg-circuit-green-dark">
                <GraduationCap size={15} />
                Register Now
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
