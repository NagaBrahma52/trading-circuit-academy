"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, LayoutDashboard, CircleUserRound, ShieldCheck } from "lucide-react";
import { logout } from "../../login/actions";

interface Props {
  collapsed: boolean;
  toggle: () => void;
  user: { email: string; name?: string; role: "user" | "admin" };
}

export default function Header({ toggle, user }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[72px] border-b border-circuit-border bg-black/95 backdrop-blur">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6">
        <button type="button" onClick={toggle} aria-label="Toggle sidebar" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:border-circuit-green/40 hover:text-circuit-green"><Menu size={19} /></button>
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.jpeg" alt="Trading Circuit" width={36} height={36} className="rounded-full object-cover" />
          <span className="hidden font-display text-base font-bold text-white sm:inline">Trading Circuit <span className="text-circuit-green">Academy</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/dashboard" className="hidden items-center gap-2 text-xs text-white/50 transition hover:text-circuit-green sm:flex"><LayoutDashboard size={15} /> Dashboard</Link>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 sm:px-3">
            <CircleUserRound size={21} className="shrink-0 text-circuit-green" />
            <div className="max-w-[170px]">
              <div className="truncate text-xs font-semibold text-white">{user.name || user.email}</div>
              <div className={`mt-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${user.role === "admin" ? "text-circuit-green" : "text-white/45"}`}><ShieldCheck size={11}/>{user.role === "admin" ? "Admin" : "Normal user"}</div>
            </div>
          </div>
          <form action={logout}><button type="submit" title="Log out" aria-label="Log out" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/65 transition hover:border-rose-400/40 hover:text-rose-300"><LogOut size={17} /></button></form>
        </div>
      </div>
    </header>
  );
}
