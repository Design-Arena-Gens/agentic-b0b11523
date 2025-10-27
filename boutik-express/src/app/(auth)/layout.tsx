import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-slate-50 md:grid-cols-[1.1fr,1fr]">
      <div className="flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-10 text-white">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Boutik Express
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight">
            Votre vitrine en ligne prête en quelques minutes
          </h1>
          <p className="mt-4 max-w-xl text-sm text-blue-50">
            Créez un lien professionnel pour vos clients, recevez des commandes sur
            WhatsApp et suivez vos performances en temps réel.
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-6 text-sm text-blue-100 backdrop-blur">
          <p className="font-semibold uppercase tracking-wide text-blue-200">
            Astuce du jour
          </p>
          <p className="mt-2">
            Ajoutez au moins 5 produits pour que votre boutique soit plus attractive.
            Des photos claires et des descriptions précises boostent vos ventes.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

