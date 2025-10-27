'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function UpgradePage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (!user || !profile) return null;

  const features = [
    "Produits illimités",
    "Statistiques détaillées (vues par produit, contacts)",
    "Page boutique optimisée pour le SEO",
    "Support prioritaire par WhatsApp",
    "Webhook pour automatiser vos ventes",
  ];

  const handleContact = () => {
    toast("Un membre de l&apos;équipe vous contactera pour activer le plan premium", {
      icon: "📞",
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="badge bg-white/20 text-white">Nouveau</span>
            <h1 className="mt-3 text-3xl font-bold">Passez au plan Premium</h1>
            <p className="mt-2 text-sm text-blue-100">
              Débloquez tout le potentiel de Boutik Express pour seulement 9 900 FCFA / mois.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-5 py-3 text-center">
            <p className="text-xs uppercase tracking-wide text-blue-100">Plan actuel</p>
            <p className="mt-1 text-lg font-semibold">
              {profile.plan === "premium" ? "Premium" : "Gratuit"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Ce que vous obtenez avec le plan Premium
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
            Paiement mobile money, génération automatique de flyers et notifications push
            arrivent bientôt. Vous serez les premiers informés !
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-700">
            <p className="text-sm font-semibold">Lancement officiel</p>
            <p className="mt-1 text-sm">
              Activation manuelle par l&apos;équipe Boutik Express.
            </p>
          </div>
          <Button className="w-full" onClick={handleContact}>
            <Sparkles className="mr-2 h-4 w-4" /> Être contacté pour le Premium
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
}
