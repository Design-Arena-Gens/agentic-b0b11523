'use client';

import { BadgeCheck, Eye, MessageCircle, PackageSearch } from "lucide-react";
import type { Product, StoreStats, UserProfile } from "@/types";

type OverviewCardsProps = {
  products: Product[];
  stats?: StoreStats | null;
  profile?: UserProfile | null;
};

export function OverviewCards({ products, stats, profile }: OverviewCardsProps) {
  const freeLimit = profile?.plan === "free" ? 10 : "∞";

  const cards = [
    {
      label: "Produits actifs",
      value: products.length,
      icon: PackageSearch,
      description:
        profile?.plan === "free"
          ? `Limite: ${freeLimit} produits`
          : "Produits illimités",
    },
    {
      label: "Vues de la boutique",
      value: stats?.viewsCount ?? 0,
      icon: Eye,
      description: "Visites cumulées",
    },
    {
      label: "Contacts WhatsApp",
      value: stats?.ordersCount ?? 0,
      icon: MessageCircle,
      description: "Clients intéressés",
    },
    {
      label: "Plan actuel",
      value: profile?.plan === "premium" ? "Premium" : "Gratuit",
      icon: BadgeCheck,
      description:
        profile?.plan === "premium"
          ? "Support prioritaire, stats avancées"
          : "Passez au plan premium pour plus de fonctionnalités",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, description }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500">{label}</h3>
            <Icon className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
      ))}
    </div>
  );
}

