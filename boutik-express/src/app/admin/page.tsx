'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { listAllUsers, setStoreDisabled } from "@/lib/firestore-helpers";
import type { UserProfile } from "@/types";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!profile?.email?.endsWith("@boutikexpress.com")) {
      router.replace("/dashboard");
    }
  }, [user, profile, loading, router]);

  useEffect(() => {
    if (!profile?.email?.endsWith("@boutikexpress.com")) return;
    const load = async () => {
      const data = await listAllUsers();
      setUsers(data);
    };
    load();
  }, [profile]);

  if (!profile?.email?.endsWith("@boutikexpress.com")) {
    return null;
  }

  const toggleStatus = async (target: UserProfile) => {
    setBusy(target.id);
    try {
      await setStoreDisabled(target.id, !target.isDisabled);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === target.id ? { ...item, isDisabled: !target.isDisabled } : item,
        ),
      );
      toast.success(
        target.isDisabled ? "Boutique réactivée" : "Boutique désactivée",
      );
    } catch (error: any) {
      toast.error(error?.message ?? "Action impossible");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Boutik Express</h1>
        <p className="text-sm text-slate-600">
          Liste des commerçants et statut de leurs boutiques.
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Boutique</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((merchant) => (
              <tr key={merchant.id} className="text-slate-700">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {merchant.businessName}
                  </div>
                  <div className="text-xs text-slate-500">{merchant.name}</div>
                </td>
                <td className="px-4 py-3">{merchant.email}</td>
                <td className="px-4 py-3 capitalize">{merchant.plan}</td>
                <td className="px-4 py-3">{merchant.storeSlug}</td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant={merchant.isDisabled ? "primary" : "outline"}
                    loading={busy === merchant.id}
                    onClick={() => toggleStatus(merchant)}
                  >
                    {merchant.isDisabled ? "Réactiver" : "Désactiver"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

