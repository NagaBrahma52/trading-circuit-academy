"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Calculator, LayoutDashboard, FileText } from "lucide-react";

export default function Sidebar({ collapsed, isAdmin = false }: { collapsed: boolean; isAdmin?: boolean }) {
  const pathname = usePathname();
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { name: "Position Sizing", icon: Calculator, url: "/dashboard/position-sizing" },
    { name: "Digital Library", icon: BookOpen, url: "/library" },
    ...(isAdmin ? [
      { name: "Manage Articles", icon: FileText, url: "/dashboard/library" },
      { name: "Write an Article", icon: FileText, url: "/dashboard/library/new" },
    ] : []),
  ];

  return (
    <aside className={`fixed bottom-0 left-0 top-[72px] z-30 hidden border-r border-circuit-border bg-black transition-all duration-300 lg:block ${collapsed ? "w-[84px]" : "w-[260px]"}`}>
      <div className="flex h-full flex-col px-3 py-5">
        <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 ${collapsed ? "text-center" : ""}`}>{collapsed ? "Menu" : "Workspace"}</p>
        <nav className="space-y-1">
          {menus.map(({ name, icon: Icon, url }) => {
            const active = pathname === url || (url !== "/dashboard" && pathname.startsWith(url));
            return <Link key={name} href={url} title={collapsed ? name : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "border border-circuit-green/20 bg-circuit-green/10 font-semibold text-circuit-green" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><Icon size={18} className="shrink-0" />{!collapsed && <span>{name}</span>}</Link>;
          })}
        </nav>
        <div className="mt-auto rounded-xl border border-circuit-border bg-circuit-card p-3">
          <div className="flex items-center gap-2 text-circuit-green"><Activity size={16} />{!collapsed && <span className="text-xs font-semibold">Trade with a plan</span>}</div>
          {!collapsed && <p className="mb-0 mt-2 text-[11px] leading-5 text-white/40">Prepare your risk before you enter the market.</p>}
        </div>
      </div>
    </aside>
  );
}
