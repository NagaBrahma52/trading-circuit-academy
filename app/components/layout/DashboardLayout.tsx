"use client";

import { useState } from "react";
import Header from "./header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
  user,
  isAdmin = false,
}: {
  children: React.ReactNode;
  user: { email: string; name?: string; role: "user" | "admin"};
  isAdmin?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-circuit-bg text-white">
      <Header collapsed={collapsed} toggle={() => setCollapsed((value) => !value)} user={user} />
      <Sidebar collapsed={collapsed} isAdmin={isAdmin} />
      <main className={`min-h-[calc(100vh-72px)] pt-[96px] pb-10 pl-4 pr-4 transition-all sm:pl-6 sm:pr-6 ${collapsed ? "lg:ml-[84px]" : "lg:ml-[260px]"}`}>
        {children}
      </main>
    </div>
  );
}
