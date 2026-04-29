"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon, UserIcon, ArrowRightOnRectangleIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/products" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="bg-red-600 rounded-lg p-1.5">
              <BuildingOffice2Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">B2B</span>
              <span className="text-blue-300 text-lg font-light ml-1">Shop</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="text-blue-200 hover:text-white transition-colors">
              Produkty
            </Link>
            <Link href="/cart" className="text-blue-200 hover:text-white transition-colors">
              Zamówienie
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg px-3 py-2 transition-colors">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Koszyk</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* User info */}
            {user && (
              <div className="flex items-center gap-2 text-sm">
                <div className="hidden lg:block text-right">
                  <p className="text-white font-medium leading-tight">{user.username}</p>
                  <p className="text-blue-300 text-xs leading-tight">{user.company}</p>
                </div>
                <div className="bg-blue-600 rounded-full p-1.5">
                  <UserIcon className="h-4 w-4" />
                </div>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors text-sm"
              title="Wyloguj"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Wyloguj</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
