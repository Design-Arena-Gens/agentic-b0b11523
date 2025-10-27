'use client';

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Product, UserProfile } from "@/types";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { incrementStoreOrders } from "@/lib/firestore-helpers";

type StorefrontProductCardProps = {
  product: Product;
  owner: UserProfile;
};

const formatPrice = (price: number) =>
  price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  });

export function StorefrontProductCard({ product, owner }: StorefrontProductCardProps) {
  const message = encodeURIComponent(
    `Bonjour! Je suis intéressé par votre produit "${product.name}" sur Boutik Express.`,
  );

  const phone = owner.whatsappNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  const handleWhatsApp = async () => {
    if (!owner.whatsappNumber) {
      toast.error("Le commerçant n'a pas encore ajouté son numéro WhatsApp.");
      return;
    }
    try {
      await incrementStoreOrders(owner.id);
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error(error);
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
        {product.imageURL ? (
          <Image
            src={product.imageURL}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <span className="text-base font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm text-slate-500">{product.description}</p>
        {product.category ? (
          <span className="badge">{product.category}</span>
        ) : null}
      </div>
      <Button
        type="button"
        className="mt-4 rounded-full bg-emerald-500 hover:bg-emerald-600"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Commander via WhatsApp
      </Button>
    </div>
  );
}
