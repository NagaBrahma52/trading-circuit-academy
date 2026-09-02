"use client";

import { useState } from "react";
import { ArrowRight, Menu, X, Activity } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-circuit-bg/90 backdrop-blur">
      <div className="container-circuit py-4">
        <div className="flex items-center justify-between gap-4 rounded-full border border-black/5 bg-white/90 px-4 py-2.5 shadow-pill sm:px-6">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-circuit-ink text-circuit-green">
              <Activity size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold text-circuit-ink">
              Trading Circuit
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-circuit-ink/70 transition hover:text-circuit-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-circuit-green px-5 py-2.5 text-sm font-bold text-circuit-ink transition hover:bg-circuit-green-dark hover:text-white sm:flex"
          >
            Join
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>

          <button
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-3xl border border-black/5 bg-white p-4 shadow-pill lg:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-circuit-ink/80 hover:bg-circuit-bg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-circuit-green px-5 py-2.5 text-sm font-bold text-circuit-ink"
              >
                Join
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
