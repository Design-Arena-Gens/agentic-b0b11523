'use client';

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signInWithGoogle, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    const registered = searchParams?.get("registered");
    if (registered) {
      toast.success("Compte créé, vous pouvez vous connecter !");
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Bienvenue 👋");
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(error?.message ?? "Connexion impossible");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success("Connexion avec Google réussie");
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(error?.message ?? "Connexion Google impossible");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Heureux de vous revoir</h2>
        <p className="text-sm text-slate-600">
          Connectez-vous pour gérer vos produits et suivre vos commandes.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Adresse e-mail"
          type="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={submitting || loading}>
          <LogIn className="mr-2 h-4 w-4" />
          Se connecter
        </Button>
      </form>
      <div className="relative py-2 text-center text-xs uppercase tracking-wide text-slate-400">
        <span className="bg-white px-3">ou</span>
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-slate-200" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogle}
        loading={submitting}
      >
        <span className="mr-2 inline-flex h-5 w-5 items-center justify-center">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              fill="#EA4335"
              d="M12 10.2v3.6h5.04c-.22 1.14-.9 2.1-1.92 2.76l3.1 2.4c1.8-1.66 2.84-4.1 2.84-7.06 0-.68-.06-1.34-.18-1.98H12z"
            />
            <path
              fill="#34A853"
              d="M6.54 13.08l-.84.64-2.48 1.92C5.32 18.98 8.44 21 12 21c2.4 0 4.42-.8 5.9-2.16l-3.1-2.4c-.86.58-1.96.92-2.8.92-2.14 0-3.96-1.44-4.6-3.4z"
            />
            <path
              fill="#4A90E2"
              d="M3.22 7.64C2.44 9.28 2 11.08 2 13c0 1.92.44 3.72 1.22 5.36l3.32-2.6c-.2-.58-.32-1.2-.32-1.84 0-.64.12-1.26.32-1.84z"
            />
            <path
              fill="#FBBC05"
              d="M12 5.4c1.3 0 2.46.44 3.38 1.32l2.52-2.52C16.4 2.78 14.38 2 12 2 8.44 2 5.32 4.02 3.54 7.08l3.32 2.6C7.8 6.84 9.62 5.4 12 5.4z"
            />
          </svg>
        </span>
        Continuer avec Google
      </Button>
      <p className="text-center text-sm text-slate-600">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
          Créer ma boutique <ArrowRight className="ml-1 inline h-4 w-4 align-text-bottom" />
        </Link>
      </p>
    </div>
  );
}
