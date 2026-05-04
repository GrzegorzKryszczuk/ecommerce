"use client";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { BuildingOffice2Icon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function AdminLoginPage() {
  const { isAdmin, adminLogin } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) router.replace("/admin/dashboard");
  }, [isAdmin, router]);

  if (isAdmin) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = adminLogin(email, password);
      if (ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Nieprawidłowy e-mail lub hasło.");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-600 rounded-2xl p-3 mb-3">
            <BuildingOffice2Icon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Panel administracyjny</h1>
          <p className="text-sm text-blue-500 mt-1">B2B Shop — tylko dla administratora</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4 flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-blue-300" />
            <span className="text-white font-semibold">Logowanie</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                Adres e-mail
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@example.com"
                className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                Hasło
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-blue-400 mt-4">
          Dostęp tylko dla uprawnionych administratorów
        </p>
      </div>
    </div>
  );
}
