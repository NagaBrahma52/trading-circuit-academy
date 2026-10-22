"use client";

import Image from "next/image";
import { Instagram, Facebook, Youtube, Send, Twitter } from "lucide-react";
import Reveal from "./Reveal";

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Twitter, href: "https://x.com" },
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Youtube, href: "https://youtube.com" },
  { icon: Send, href: "https://t.me/Wealth_Engr" },
];

const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Client Results", href: "/#results" },
  { label: "Contact Us", href: "/#footer" },
];

export default function LandingFooter() {
  return (
    <footer id="footer" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-circuit-green/10 to-transparent"
      />
      <Reveal className="container-circuit relative py-16 text-center sm:py-20">
        <a href="/#home" className="inline-flex items-center gap-2.5">
          <Image src="/logo.jpeg" alt="Trading Circuit Academy" width={40} height={40} className="rounded-full object-cover" />
          <span className="font-display text-xl font-bold text-white">
            Trading Circuit
          </span>
        </a>

        <div className="mt-6 flex items-center justify-center gap-3">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-circuit-green text-black transition hover:bg-circuit-green-dark"
            >
              <s.icon size={16} strokeWidth={2.2} />
            </a>
          ))}
        </div>

        <p className="mt-10 text-sm font-semibold text-white">Quick Links</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/60 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-md">
          <p className="text-sm font-semibold text-white">
            Subscribe to our Newsletter
          </p>
          <p className="mt-2 text-sm text-white/55">
            Get market insights, updates, and new releases straight to your
            inbox.
          </p>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full flex-1 rounded-md border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-circuit-green focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-circuit-green px-6 py-3 text-sm font-semibold text-black transition hover:bg-circuit-green-dark"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-14 border-t border-circuit-border pt-8">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Trading Circuit. All rights
            reserved
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-relaxed text-white/30">
            Disclaimer: Trading involves risk and may result in the loss of
            capital. Past performance is not indicative of future results.
            All content, including the e-book and mentorship, is for
            educational purposes only and does not constitute financial
            advice. No guarantees are made, and you are responsible for your
            own decisions.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
