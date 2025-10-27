'use client';

import { useMemo } from "react";
import { Copy, LinkIcon, Share2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoreStats, UserProfile } from "@/types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type StoreHeaderProps = {
  profile: UserProfile;
  stats?: StoreStats | null;
};

const PLAN_LABELS: Record<string, string> = {
  free: "Plan Gratuit",
  premium: "Plan Premium",
};

export function StoreHeader({ profile, stats }: StoreHeaderProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentic-b0b11523.vercel.app";
  const publicUrl = useMemo(() => {
    return `${siteUrl}/store/${profile.storeSlug}`;
  }, [profile.storeSlug, siteUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Lien copié");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: profile.businessName,
        url: publicUrl,
        text: "Découvrez ma boutique Boutik Express",
      });
      return;
    }
    handleCopy();
  };

  return (
    <div className="grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-white p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge">{PLAN_LABELS[profile.plan] ?? "Plan Gratuit"}</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            {profile.businessName}
          </h1>
          {profile.businessDescription ? (
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              {profile.businessDescription}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Statistiques
          </p>
          <p className="mt-2 text-xs text-slate-500">Vues</p>
          <p className="text-xl font-semibold text-blue-600">
            {stats?.viewsCount ?? 0}
          </p>
          <p className="mt-1 text-xs text-slate-500">Contacts WhatsApp</p>
          <p className="text-xl font-semibold text-emerald-600">
            {stats?.ordersCount ?? 0}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <LinkIcon className="hidden h-4 w-4 text-blue-500 sm:block" />
          <span className="truncate">{publicUrl}</span>
        </div>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleCopy}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copier
        </Button>
        <Button
          type="button"
          variant="primary"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </Button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm md:grid-cols-[auto,1fr]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Numéro WhatsApp</p>
            <p className="text-sm text-slate-500">{profile.whatsappNumber || "À compléter"}</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Les clients cliqueront sur “Commander via WhatsApp” pour vous contacter
          directement. Assurez-vous que votre numéro est correct et disponible.
        </p>
      </div>
    </div>
  );
}

