"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Send, Activity, LogIn, UserPlus, LayoutDashboard, CircleUserRound, ShieldCheck, LogOut } from "lucide-react";
import { logout } from "../../login/actions";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Client Results", href: "#results" },
  { label: "Digital Library", href: "/library" },
  { label: "Contact Us", href: "#footer" },
];

const linkClass = "text-sm text-white/70 transition hover:text-circuit-green";
const actionClass = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition";

type NavbarUser = { name: string | null; email: string; role: "user" | "admin" } | null;

export default function NavbarClient({ currentUser }: { currentUser: NavbarUser }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-circuit-border bg-black/95 backdrop-blur">
      <div className="container-circuit flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/#home" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-circuit-green text-black">
            <Activity size={17} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold text-white">Trading Circuit</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {LINKS.map((link) => <a key={link.href} href={link.href} className={linkClass}>{link.label}</a>)}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {currentUser ? (
            <>
              <Link href="/dashboard" className={`${actionClass} border border-circuit-green/30 text-white hover:border-circuit-green`}><LayoutDashboard size={15} /> Dashboard</Link>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <CircleUserRound size={19} className="text-circuit-green" />
                <div className="max-w-[145px]"><div className="truncate text-xs font-semibold text-white">{currentUser.name || currentUser.email}</div><div className={`mt-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${currentUser.role === "admin" ? "text-circuit-green" : "text-white/45"}`}><ShieldCheck size={11}/>{currentUser.role === "admin" ? "Admin" : "Normal user"}</div></div>
              </div>
              <form action={logout}><button type="submit" className={`${actionClass} border border-white/20 text-white hover:border-rose-400/50`}><LogOut size={15}/> Log out</button></form>
            </>
          ) : (
            <>
              <Link href="/login" className={`${actionClass} border border-white/20 text-white hover:border-circuit-green/60`}><LogIn size={15} /> Log in</Link>
              <Link href="/login?mode=signup" className={`${actionClass} bg-circuit-green text-black hover:bg-circuit-green-dark`}><UserPlus size={15} /> Sign up</Link>
            </>
          )}
        </div>

        <button aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-circuit-border bg-black px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5">{link.label}</a>)}
            <a href="#plans" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-circuit-green px-5 py-2.5 text-center text-sm font-semibold text-black">Available Plans</a>
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 rounded-lg border border-white/10 p-3"><CircleUserRound className="text-circuit-green"/><div><div className="text-sm font-semibold text-white">{currentUser.name || currentUser.email}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-circuit-green">{currentUser.role === "admin" ? "Admin" : "Normal user"}</div></div></div>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-md border border-circuit-green/30 px-5 py-2.5 text-center text-sm font-semibold text-white"><LayoutDashboard className="mr-2 inline" size={15}/>Dashboard</Link>
                <form action={logout}><button type="submit" className="w-full rounded-md border border-white/20 px-5 py-2.5 text-center text-sm font-semibold text-white"><LogOut className="mr-2 inline" size={15}/>Log out</button></form>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-md border border-white/20 px-5 py-2.5 text-center text-sm font-semibold text-white">Log in</Link>
                <Link href="/login?mode=signup" onClick={() => setOpen(false)} className="rounded-md bg-circuit-green px-5 py-2.5 text-center text-sm font-semibold text-black">Sign up</Link>
              </>
            )}
            <a href="https://t.me/Wealth_Engr" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"><Send size={14} /> Join our Telegram</a>
          </div>
        </div>
      )}
    </div>
  );
}
