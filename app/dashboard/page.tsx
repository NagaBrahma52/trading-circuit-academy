import Link from "next/link";
import { ArrowUpRight, BookOpen, Calculator, GraduationCap, BookOpen as LibraryIcon, ShieldCheck } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/profile";

const tools = [
  { title: "Position sizing", description: "Calculate trade size from account balance, risk percentage, and stop-loss distance.", href: "/dashboard/position-sizing", icon: Calculator, tag: "Trading tool" },
  { title: "Digital library", description: "Explore published trading lessons, market breakdowns, and strategy notes.", href: "/library", icon: BookOpen, tag: "Learn" },
];

export default async function Dashboard() {
  const profile = await getCurrentProfile();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-circuit-border bg-circuit-card p-6 sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-circuit-green/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-circuit-green/25 bg-circuit-green/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-circuit-green"><span className="h-1.5 w-1.5 rounded-full bg-circuit-green" /> Your trading workspace</p>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Trade with a <span className="text-circuit-green">clear plan.</span></h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">Focused tools and carefully written lessons to help you prepare each setup with structure and discipline.</p>
          </div>
          <Link href="/dashboard/position-sizing" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-circuit-green px-5 py-3 text-sm font-bold text-black transition hover:bg-circuit-green-dark">Open position calculator <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-circuit-green">Workspace</p><h2 className="mt-1 font-display text-xl font-bold text-white">Your trading toolkit</h2></div>
          <span className="text-xs text-white/40">Choose a module to get started</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map(({ title, description, href, icon: Icon, tag }) => {
            const content = <><div className="mb-5 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-circuit-green/20 bg-circuit-green/10 text-circuit-green"><Icon size={21} /></span>{href ? <ArrowUpRight size={17} className="text-white/30 transition group-hover:text-circuit-green" /> : <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/35">Planned</span>}</div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">{tag}</p><h3 className="mt-2 font-display text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{description}</p></>;
            return href ? <Link key={title} href={href} className="group rounded-2xl border border-circuit-border bg-circuit-card p-5 transition hover:-translate-y-1 hover:border-circuit-green/40">{content}</Link> : <div key={title} className="rounded-2xl border border-circuit-border bg-circuit-card p-5 opacity-80">{content}</div>;
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-circuit-border bg-circuit-card p-6 sm:p-7">
          <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-circuit-green"><GraduationCap size={22} /></span><div><h2 className="font-display text-lg font-bold text-white">Learn with purpose</h2><p className="mt-2 text-sm leading-6 text-white/55">Explore the Digital Library for in-depth lessons, trading concepts, and market breakdowns curated by the academy admin.</p><Link href="/library" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-circuit-green hover:text-white">Browse learning resources <ArrowUpRight size={15} /></Link></div></div>
        </div>
        <div className="rounded-2xl border border-circuit-border bg-circuit-card p-6 sm:p-7">
          <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-circuit-green"><ShieldCheck size={22} /></span><div><h2 className="font-display text-lg font-bold text-white">Your account</h2><p className="mt-2 text-sm leading-6 text-white/55">Your workspace is private to your signed-in account.</p>{isAdmin ? <Link href="/dashboard/library" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-circuit-green hover:text-white"><LibraryIcon size={15} /> Manage digital library</Link> : <p className="mt-4 text-xs text-white/35">Need to publish content? Contact your academy administrator.</p>}</div></div>
        </div>
      </section>
    </div>
  );
}
