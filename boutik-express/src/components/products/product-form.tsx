'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

const categories = [
  "Beauté & soins",
  "Mode & couture",
  "Alimentation",
  "Services",
  "Technologie",
  "Artisanat",
  "Accessoires",
  "Autres",
];

type ProductPayload = {
  name: string;
  description: string;
  price: number;
  imageFile?: File | null;
  imageURL?: string;
  category?: string;
};

type ProductFormProps = {
  initialData?: Product;
  loading?: boolean;
  onSubmit: (payload: ProductPayload) => Promise<void>;
};

export function ProductForm({ initialData, loading, onSubmit }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(
    initialData?.price ? initialData.price.toString() : "",
  );
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imageURL ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const isEdit = useMemo(() => Boolean(initialData), [initialData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name || !description || !price) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    const numericPrice = Number(price.replace(/\s/g, "").replace(",", "."));
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError("Veuillez indiquer un prix valide.");
      return;
    }

    await onSubmit({
      name,
      description,
      price: numericPrice,
      imageFile,
      imageURL: initialData?.imageURL,
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {isEdit ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </h2>
        <p className="text-sm text-slate-500">
          Complétez les informations pour mettre votre produit en avant sur votre vitrine.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nom du produit"
          placeholder="Ex: Perruque lisse 30 pouces"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          label="Prix (FCFA)"
          type="number"
          min="0"
          step="100"
          placeholder="Ex: 45000"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Décrivez le produit, ses avantages, ses matières, etc."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={4}
        required
      />

      <Select
        label="Catégorie"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">Sélectionnez une catégorie (optionnel)</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">
          Photo du produit <span className="text-red-500">*</span>
        </span>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 hover:border-blue-300 hover:bg-blue-50">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (!files || !files[0]) return;
              setImageFile(files[0]);
            }}
          />
          {preview ? (
            <div className="relative h-36 w-36 overflow-hidden rounded-xl">
              <Image src={preview} alt="Aperçu du produit" fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-500">
              📷
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-700">
              {preview ? "Changer l'image" : "Télécharger une image"}
            </p>
            <p className="text-xs text-slate-500">
              Formats acceptés: JPG, PNG. Taille max 5 Mo.
            </p>
          </div>
        </label>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="submit" loading={loading}>
          {isEdit ? "Enregistrer les modifications" : "Publier le produit"}
        </Button>
      </div>
    </form>
  );
}

export type { ProductPayload };

