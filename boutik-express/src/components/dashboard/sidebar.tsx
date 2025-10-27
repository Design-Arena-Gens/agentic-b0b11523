'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Settings,
  Sparkles,
  Store,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    href: "/dashboard",
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/products",
    label: "Mes produits",
    icon: Boxes,
  },
  {
    href: "/dashboard/products/new",
    label: "Ajouter un produit",
    icon: PlusCircle,
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
    label: "Upgrade plan",
    icon: Sparkles,
  },
];

const quickActions = [
  {
    href: "/store",
    label: "Voir la vitrine publique",
    icon: BarChart3,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-none rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur md:block">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Store className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-600">Boutik Express</p>
            <h2 className="text-lg font-bold text-slate-900">
              Tableau de bord
            </h2>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600",
                  isActive && "bg-blue-600 text-white shadow-soft hover:bg-blue-600",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-5 text-white shadow-soft">
          <h3 className="text-base font-semibold">Boostez vos ventes</h3>
          <p className="mt-2 text-sm text-blue-50">
            Passez au plan Premium pour ajouter un nombre illimité de produits et
            recevoir des statistiques avancées.
          </p>
          <Button
            asChild
            className="mt-4 w-full bg-white text-blue-600 hover:bg-blue-50"
            variant="primary"
          >
            <Link href="/dashboard/upgrade">Découvrir le plan Premium</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

