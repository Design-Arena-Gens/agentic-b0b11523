'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchProductsForUser, fetchStoreStats } from "@/lib/firestore-helpers";
import type { Product, StoreStats } from "@/types";
import { StoreHeader } from "@/components/dashboard/store-header";
import { Button } from "@/components/ui/button";

export default function StorePage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
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
        const [items, statsData] = await Promise.all([
          fetchProductsForUser(profile.id),
          fetchStoreStats(profile.id),
        ]);
        setProducts(items);
        setStats(statsData ?? null);
      } catch (error: any) {
        toast.error(error?.message ?? "Impossible de charger la boutique");
      }
    };
    load();
  }, [profile]);

  if (!user || !profile) return null;

  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentic-b0b11523.vercel.app"}/store/${profile.storeSlug}`;

  return (
    <div className="space-y-6">
      <StoreHeader profile={profile} stats={stats ?? undefined} />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Aperçu rapide</h2>
        <p className="mt-2 text-sm text-slate-600">
          Vous avez actuellement {products.length} produit(s) en ligne. Partagez votre lien
          pour toucher plus de clients.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={publicUrl} target="_blank">
              Voir la boutique publique
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/products/new">Ajouter un produit</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Prochaines étapes</h3>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. Ajoutez au moins 5 produits pour une vitrine complète.</li>
            <li>2. Mettez en avant votre best-seller avec une description détaillée.</li>
            <li>3. Partagez votre lien sur WhatsApp, Facebook et Instagram.</li>
          </ol>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Liens utiles</h3>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            <p>
              • Besoin d&apos;aide ? Écrivez à support@boutikexpress.com ou via WhatsApp.
            </p>
            <p>• Astuce: ajoutez vos horaires d&apos;ouverture dans votre description.</p>
            <p>
              • Premium arrive bientôt avec paiements mobile money et flyers automatiques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

