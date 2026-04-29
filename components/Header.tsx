"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname, useSearchParams } from "next/navigation";
import { ShoppingCartIcon, BuildingOffice2Icon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NAV_CATEGORIES } from "@/data/products";
import { useState, Suspense } from "react";

function HeaderInner() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/products"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="bg-red-600 rounded-lg p-1.5">
              <BuildingOffice2Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">B2B</span>
              <span className="text-blue-300 text-lg font-light ml-1">Shop</span>
            </div>
          </Link>

          {/* Desktop category nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/products"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/products" && !activeCategory
                  ? "bg-blue-700 text-white"
                  : "text-blue-200 hover:text-white hover:bg-blue-800"
              }`}
            >
              Wszystkie
            </Link>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-red-600 text-white"
                    : "text-blue-200 hover:text-white hover:bg-blue-800"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg px-3 py-2 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Koszyk</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-blue-800 border-t border-blue-700 px-4 py-3">
          <nav className="flex flex-col gap-1">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/products" && !activeCategory
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:text-white hover:bg-blue-700"
              }`}
            >
              Wszystkie produkty
            </Link>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-red-600 text-white"
                    : "text-blue-200 hover:text-white hover:bg-blue-700"
                }`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense>
      <HeaderInner />
    </Suspense>
  );
}
