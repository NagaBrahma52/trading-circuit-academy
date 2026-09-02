import { Activity } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="container-circuit flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-circuit-ink text-circuit-green">
            <Activity size={14} strokeWidth={2.5} />
          </span>
          <span className="font-display text-sm font-bold text-circuit-ink">
            Trading Circuit
          </span>
        </a>
        <p className="text-xs text-circuit-ink/45">
          Copyright &copy; {new Date().getFullYear()} Trading Circuit. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
