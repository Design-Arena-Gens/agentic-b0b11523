'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { updateUserProfile } from "@/lib/firestore-helpers";

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, loading, refreshProfile, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    businessDescription: "",
    whatsappNumber: "",
    phoneNumber: "",
    storeSlug: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name,
      businessName: profile.businessName,
      businessDescription: profile.businessDescription ?? "",
      whatsappNumber: profile.whatsappNumber,
      phoneNumber: profile.phoneNumber ?? "",
      storeSlug: profile.storeSlug,
    });
  }, [profile]);

  if (!user || !profile) return null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await updateUserProfile(user.uid, {
        name: form.name,
        businessName: form.businessName,
        businessDescription: form.businessDescription,
        whatsappNumber: form.whatsappNumber,
        phoneNumber: form.phoneNumber,
        storeSlug: form.storeSlug,
      });
      await refreshProfile();
      toast.success("Profil mis à jour");
    } catch (error: any) {
      toast.error(error?.message ?? "Impossible de mettre à jour le profil");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-600">
          Mettez à jour vos informations et personnalisez votre vitrine.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Nom complet"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Nom de la boutique"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <Textarea
          label="Description"
          name="businessDescription"
          value={form.businessDescription}
          onChange={handleChange}
          rows={4}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Numéro WhatsApp"
            name="whatsappNumber"
            value={form.whatsappNumber}
            onChange={handleChange}
            required
          />
          <Input
            label="Numéro secondaire"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Lien de la boutique"
          name="storeSlug"
          value={form.storeSlug}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-slate-500">
          Votre boutique est accessible via:
          {" "}
          <span className="font-semibold text-blue-600">
            {` ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentic-b0b11523.vercel.app"}/store/${form.storeSlug}`}
          </span>
        </p>
        <Button type="submit" loading={submitting}>
          Sauvegarder
        </Button>
      </form>

      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">Déconnexion</h2>
        <p className="mt-2 text-sm text-red-600">
          Déconnectez-vous de Boutik Express sur cet appareil.
        </p>
        <Button className="mt-4 bg-red-500 hover:bg-red-600" onClick={() => logout()}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}

