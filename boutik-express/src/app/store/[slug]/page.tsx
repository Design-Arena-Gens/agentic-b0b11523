'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { StorefrontProductCard } from "@/components/storefront/storefront-product-card";
import {
  fetchPublicProducts,
  fetchStoreStats,
  fetchUserBySlug,
  incrementStoreView,
} from "@/lib/firestore-helpers";
import type { Product, StoreStats, UserProfile } from "@/types";
import { Loader2 } from "lucide-react";

export default function StorefrontPage() {
  const params = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<StoreStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!params?.slug) return;
      const merchant = await fetchUserBySlug(params.slug);
      if (!merchant || merchant.isDisabled) {
        setProfile(null);
        setLoading(false);
        return;
      }
      setProfile(merchant);
      const [items, statsData] = await Promise.all([
        fetchPublicProducts(merchant.id),
        fetchStoreStats(merchant.id),
      ]);
      setProducts(items);
      setStats(statsData ?? null);
      await incrementStoreView(merchant.id);
      setLoading(false);
    };
    load();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container space-y-10 py-10">
        {profile ? (
          <>
            <StorefrontHeader profile={profile} stats={stats ?? undefined} />
            {products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
                Aucun produit disponible pour le moment. Revenez bientôt !
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <StorefrontProductCard key={product.id} product={product} owner={profile} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Cette boutique n&apos;est plus disponible.
          </div>
        )}
      </div>
    </div>
  );
}
