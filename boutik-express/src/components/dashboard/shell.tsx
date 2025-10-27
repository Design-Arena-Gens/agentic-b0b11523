'use client';

import { ReactNode } from "react";
import { DashboardSidebar } from "./sidebar";
import { MobileDashboardNav } from "./mobile-nav";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-10">
        <div className="mb-6 md:hidden">
          <MobileDashboardNav />
        </div>
        <div className="grid gap-6 md:grid-cols-[auto,1fr]">
          <DashboardSidebar />
          <main className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
