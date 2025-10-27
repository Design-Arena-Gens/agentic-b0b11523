'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Product, StoreStats } from "@/types";
import { fetchProductsForUser, fetchStoreStats } from "@/lib/firestore-helpers";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const router = useRouter();
  const { user, profile, loading, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<StoreStats | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      try {
        const [items, storeStats] = await Promise.all([
          fetchProductsForUser(profile.id),
          fetchStoreStats(profile.id),
        ]);
        setProducts(items);
        setStats(storeStats ?? null);
      } catch (error: any) {
        toast.error(error?.message ?? "Impossible de charger les données");
      } finally {
        // no-op
      }
    };
    load();
  }, [profile]);

  if (!user || !profile) {
    return null;
  }

  if (profile.isDisabled) {
    return (
      <div className="space-y-6 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        <h2 className="text-2xl font-bold">Boutique désactivée</h2>
        <p className="text-sm">
          Votre boutique a été désactivée par l&apos;équipe Boutik Express pour raison de
          modération. Contactez le support pour plus d&apos;informations.
        </p>
        <Button variant="outline" onClick={() => logout()}>
          Se déconnecter
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bonjour {profile.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-slate-600">
            Voici un résumé de vos performances et des actions rapides.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">Ajouter un produit</Link>
        </Button>
      </div>

      <OverviewCards products={products} stats={stats ?? undefined} profile={profile} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Conseils pour booster vos ventes
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Ajoutez des photos nettes avec un fond clair.</li>
            <li>• Indiquez les tailles, matières ou ingrédients.</li>
            <li>• Renseignez vos horaires dans la description.</li>
            <li>• Partagez votre lien boutique sur vos réseaux.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 p-6 text-white shadow-soft">
          <h3 className="text-lg font-semibold">Passez en plan Premium</h3>
          <p className="mt-2 text-sm text-blue-100">
            Produits illimités, statistiques avancées et assistance prioritaire pour 9 900 FCFA/mois.
          </p>
          <Button asChild className="mt-4 bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/dashboard/upgrade">Découvrir le plan</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
