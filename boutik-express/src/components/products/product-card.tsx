'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[160px,1fr]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
        {product.imageURL ? (
          <Image
            src={product.imageURL}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Pas d&apos;image
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500">
              {product.category ? (
                <span className="badge">{product.category}</span>
              ) : null}
            </p>
          </div>
          <span className="text-xl font-bold text-blue-600">
            {product.price.toLocaleString("fr-FR", {
              style: "currency",
              currency: "XOF",
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
        <p className="text-sm text-slate-600">{product.description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {onEdit ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => onEdit(product)}
            >
              Modifier
            </Button>
          ) : null}
          {onDelete ? (
            <Button
              type="button"
              variant="ghost"
              className={cn(
                "rounded-full border border-transparent text-red-500 hover:border-red-100 hover:bg-red-50",
              )}
              onClick={() => onDelete(product)}
            >
              Supprimer
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
