'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    businessDescription: "",
    whatsappNumber: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (!form.whatsappNumber) {
      toast.error("Veuillez indiquer un numéro WhatsApp");
      setSubmitting(false);
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        businessName: form.businessName,
        businessDescription: form.businessDescription,
        whatsappNumber: form.whatsappNumber,
        phoneNumber: form.phoneNumber,
      });
      toast.success("Bienvenue sur Boutik Express !");
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(error?.message ?? "Inscription impossible");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Créez votre compte</h2>
        <p className="text-sm text-slate-600">
          Lancez votre vitrine digitale et recevez des commandes sur WhatsApp.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Nom complet"
          name="name"
          placeholder="Ex: Aïcha Ndiaye"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Adresse e-mail"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Nom de votre commerce"
          name="businessName"
          placeholder="Ex: Chez Aïcha"
          value={form.businessName}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Description de la boutique"
          name="businessDescription"
          placeholder="Parlez de vos produits ou services, de votre style, de vos points forts..."
          value={form.businessDescription}
          onChange={handleChange}
          rows={4}
        />
        <Input
          label="Numéro WhatsApp"
          name="whatsappNumber"
          placeholder="Ex: +221770000000"
          value={form.whatsappNumber}
          onChange={handleChange}
          required
        />
        <Input
          label="Numéro de téléphone secondaire (optionnel)"
          name="phoneNumber"
          placeholder="Ex: +221780000000"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full" loading={submitting || loading}>
          <Sparkles className="mr-2 h-4 w-4" />
          Je lance ma boutique
        </Button>
      </form>
      <p className="text-center text-sm text-slate-600">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Me connecter <ArrowRight className="ml-1 inline h-4 w-4 align-text-bottom" />
        </Link>
      </p>
    </div>
  );
}

