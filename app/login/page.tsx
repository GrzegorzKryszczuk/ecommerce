"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { BuildingOffice2Icon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const ok = login(username.trim(), password);
    if (ok) {
      router.push("/products");
    } else {
      setError("Nieprawidłowy login lub hasło");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-red-600 rounded-2xl p-4 mb-4 shadow-xl">
            <BuildingOffice2Icon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">B2B Shop</h1>
          <p className="text-blue-200 mt-1">Platforma zamówień dla firm</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6 text-center">Zaloguj się</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                Login
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="np. admin"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1.5">
                Hasło
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors duration-150 text-sm tracking-wide"
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-5 border-t border-blue-100">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">Konta demonstracyjne</p>
            <div className="space-y-2 text-xs text-blue-700">
              <div className="flex justify-between bg-blue-50 rounded px-3 py-1.5">
                <span className="font-mono font-semibold">admin</span>
                <span className="text-blue-400">/</span>
                <span className="font-mono">admin123</span>
              </div>
              <div className="flex justify-between bg-blue-50 rounded px-3 py-1.5">
                <span className="font-mono font-semibold">demo</span>
                <span className="text-blue-400">/</span>
                <span className="font-mono">demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
