'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ProductCard } from "@/components/products/product-card";
import { useAuth } from "@/context/AuthContext";
import { deleteProduct, fetchProductsForUser } from "@/lib/firestore-helpers";
import type { Product } from "@/types";
import toast from "react-hot-toast";
import { FolderPlus } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (!profile) return;
    const loadProducts = async () => {
      const items = await fetchProductsForUser(profile.id);
      setProducts(items);
    };
    loadProducts();
  }, [profile]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        set.add(product.category);
      }
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Supprimer ${product.name} ?`)) return;
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
      toast.success("Produit supprimé");
    } catch (error: any) {
      toast.error(error?.message ?? "Suppression impossible");
    }
  };

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/products/${product.id}/edit`);
  };

  if (!user || !profile) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes produits</h1>
          <p className="text-sm text-slate-600">
            Gérez vos articles, mettez-les en avant et maintenez votre vitrine à jour.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <FolderPlus className="mr-2 h-4 w-4" /> Nouveau produit
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[2fr,1fr]">
        <Input
          placeholder="Rechercher un produit"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">Toutes les catégories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
          <p>Aucun produit pour l&apos;instant.</p>
          <Button asChild>
            <Link href="/dashboard/products/new">Ajouter mon premier produit</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
