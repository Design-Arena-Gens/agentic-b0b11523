'use client';

import { useMemo } from "react";
import Image from "next/image";
import { BadgeCheck, MapPin, Phone, Share2 } from "lucide-react";
import type { StoreStats, UserProfile } from "@/types";
import toast from "react-hot-toast";

type StorefrontHeaderProps = {
  profile: UserProfile;
  stats?: StoreStats | null;
};

export function StorefrontHeader({ profile, stats }: StorefrontHeaderProps) {
  const message = `Découvrez ${profile.businessName} sur Boutik Express !`;

  const handleShare = async () => {
    const shareData = {
      title: profile.businessName,
      text: message,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error(error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié");
    }
  };

  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 p-6 text-white shadow-soft">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/pattern.svg"
          alt=""
          fill
          className="object-cover mix-blend-overlay"
        />
      </div>
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold">
            {profile.businessName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              <span className="font-semibold uppercase text-emerald-100">
                Boutique vérifiée
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-bold">{profile.businessName}</h1>
            {profile.businessDescription ? (
              <p className="mt-2 max-w-xl text-sm text-blue-50">
                {profile.businessDescription}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-blue-100">
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> {profile.whatsappNumber || "WhatsApp indisponible"}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm">
          <p className="text-xs uppercase tracking-wide text-blue-100">
            Statistiques
          </p>
          <div className="mt-2 flex items-center gap-4">
            <div>
              <p className="text-2xl font-semibold">
                {stats?.viewsCount ?? 0}
              </p>
              <p className="text-xs uppercase tracking-wide text-blue-100">
                vues
              </p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div>
              <p className="text-2xl font-semibold">
                {stats?.ordersCount ?? 0}
              </p>
              <p className="text-xs uppercase tracking-wide text-blue-100">
                contacts
              </p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
          >
            <Share2 className="h-4 w-4" /> Partager la boutique
          </button>
        </div>
      </div>
    </header>
  );
}

