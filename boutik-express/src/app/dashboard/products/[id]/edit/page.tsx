'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ProductForm, type ProductPayload } from "@/components/products/product-form";
import { useAuth } from "@/context/AuthContext";
import { fetchProduct, updateProduct } from "@/lib/firestore-helpers";
import type { Product } from "@/types";
import { getFirebaseStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const load = async () => {
      if (!params?.id) return;
      const item = await fetchProduct(params.id);
      if (!item) {
        toast.error("Produit introuvable");
        router.replace("/dashboard/products");
        return;
      }
      setProduct(item);
    };
    load();
  }, [params?.id, router]);

  if (!user || !profile || !product) return null;

  const handleSubmit = async (payload: ProductPayload) => {
    setSubmitting(true);
    try {
      let imageURL = payload.imageURL ?? product.imageURL;

      if (payload.imageFile) {
        if (payload.imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Image trop lourde (max 5 Mo)");
        }
        const fileRef = ref(
          getFirebaseStorage(),
          `products/${profile.id}/${Date.now()}-${payload.imageFile.name}`,
        );
        const snapshot = await uploadBytes(fileRef, payload.imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      await updateProduct(product.id, {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        imageURL,
      });

      toast.success("Produit mis à jour");
      router.push("/dashboard/products");
    } catch (error: any) {
      toast.error(error?.message ?? "Impossible de mettre à jour le produit");
    } finally {
      setSubmitting(false);
    }
  };

  return <ProductForm initialData={product} onSubmit={handleSubmit} loading={submitting} />;
}
