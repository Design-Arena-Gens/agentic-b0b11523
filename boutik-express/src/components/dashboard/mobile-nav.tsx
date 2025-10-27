'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Boxes,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  Store,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/dashboard",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/products",
    label: "Produits",
    icon: Boxes,
  },
  {
    href: "/dashboard/store",
    label: "Ma boutique",
    icon: Store,
  },
  {
    href: "/dashboard/settings",
    label: "Paramètres",
    icon: Settings,
  },
  {
    href: "/dashboard/upgrade",
    label: "Upgrade",
    icon: Sparkles,
  },
];

export function MobileDashboardNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
      >
        Menu
        <Menu className="h-5 w-5" />
      </button>
      {open ? (
        <div className="mt-2 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600",
                  active && "bg-blue-600 text-white hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

