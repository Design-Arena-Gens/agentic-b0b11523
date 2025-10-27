'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ProductForm, type ProductPayload } from "@/components/products/product-form";
import { useAuth } from "@/context/AuthContext";
import { addProduct } from "@/lib/firestore-helpers";
import { getFirebaseStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function NewProductPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (!user || !profile) return null;

  const handleSubmit = async (payload: ProductPayload) => {
    if (!payload.imageFile) {
      toast.error("Merci d'ajouter une image");
      return;
    }

    if (payload.imageFile.size > 5 * 1024 * 1024) {
      toast.error("Image trop lourde (max 5 Mo)");
      return;
    }

    setSubmitting(true);
    try {
      const fileRef = ref(
        getFirebaseStorage(),
        `products/${profile.id}/${Date.now()}-${payload.imageFile.name}`,
      );
      const snapshot = await uploadBytes(fileRef, payload.imageFile);
      const imageURL = await getDownloadURL(snapshot.ref);

      await addProduct(
        {
          ownerId: profile.id,
          name: payload.name,
          description: payload.description,
          price: payload.price,
          imageURL,
          category: payload.category,
        },
        profile.plan,
      );

      toast.success("Produit publié avec succès");
      router.push("/dashboard/products");
    } catch (error: any) {
      toast.error(error?.message ?? "Impossible d'ajouter le produit");
    } finally {
      setSubmitting(false);
    }
  };

  return <ProductForm onSubmit={handleSubmit} loading={submitting} />;
}
