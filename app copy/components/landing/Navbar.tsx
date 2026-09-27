"use client";

import { useState } from "react";
import { Menu, X, Send, Activity } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Client Results", href: "#results" },
  { label: "Contact Us", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-circuit-border bg-black/95 backdrop-blur">
      <div className="container-circuit flex h-[72px] items-center justify-between gap-4">
        <a href="#home" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-circuit-green text-black">
            <Activity size={17} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            Trading Circuit
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <a
            href="#plans"
            className="rounded-md bg-circuit-green px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-circuit-green-dark"
          >
            Available Plans
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Join our Telegram
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-circuit-border bg-black px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#plans"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-circuit-green px-5 py-2.5 text-sm font-semibold text-black"
            >
              Available Plans
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Send size={14} />
              Join our Telegram
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
