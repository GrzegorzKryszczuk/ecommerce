"use client";
import { useState, useMemo, Suspense } from "react";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

const PAGE_SIZE = 12;

function ProductsInner() {
  const { products } = useProducts();
  const { addToCart, items } = useCart();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "Wszystkie";

  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return products.filter((p) => {
      const matchCat = urlCategory === "Wszystkie" || p.category === urlCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, urlCategory, products]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleAdd = (product: typeof products[0]) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const cartCount = (id: number) => items.find((i) => i.product.id === id)?.quantity ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              {urlCategory === "Wszystkie" ? "Katalog produktów" : urlCategory}
            </h1>
            <p className="text-blue-500 text-sm mt-0.5">
              Znaleziono <span className="font-semibold text-blue-700">{filtered.length}</span> produktów
            </p>
          </div>

          {/* Search */}
          <div className="relative sm:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              placeholder="Szukaj po nazwie lub kodzie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Grid — 4 kolumny na dużym ekranie */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visible.map((product) => {
                const inCart = cartCount(product.id);
                const justAdded = addedId === product.id;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col overflow-hidden"
                  >
                    {/* Card top */}
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue-300 font-mono tracking-wider shrink-0">
                        {product.code}
                      </span>
                      <span className="text-xs font-medium bg-blue-600/70 text-blue-100 px-2 py-0.5 rounded-full truncate">
                        {product.category}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-blue-900 text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-blue-400 line-clamp-2 mb-3 flex-1">
                        {product.description}
                      </p>

                      {/* Prices */}
                      <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-blue-500">Netto:</span>
                          <span className="font-bold text-blue-900 text-sm">
                            {product.nettoPrice.toFixed(2)} zł
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-500">Brutto:</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {product.bruttoPrice.toFixed(2)} zł
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1 pt-1 border-t border-blue-100">
                          <span className="text-xs text-blue-400">Jednostka:</span>
                          <span className="text-xs text-blue-600 font-medium">{product.unit}</span>
                        </div>
                      </div>

                      {/* Stock */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            product.stock > 10
                              ? "bg-green-400"
                              : product.stock > 3
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                        />
                        <span className="text-xs text-blue-400">Stan: {product.stock} {product.unit}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleAdd(product)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            justAdded
                              ? "bg-green-500 text-white"
                              : "bg-blue-700 hover:bg-blue-800 text-white"
                          }`}
                        >
                          {justAdded ? (
                            <>
                              <CheckIcon className="h-3.5 w-3.5" />
                              Dodano
                            </>
                          ) : (
                            <>
                              <ShoppingCartIcon className="h-3.5 w-3.5" />
                              Dodaj
                              {inCart > 0 && (
                                <span className="bg-blue-500 rounded-full px-1.5 py-0.5 text-xs">
                                  {inCart}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                        <Link
                          href={`/products/${product.id}`}
                          className="flex items-center justify-center p-2 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Szczegóły / Edytuj"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-8 text-center">
                <p className="text-sm text-blue-400 mb-3">
                  Wyświetlono {visibleCount} z {filtered.length} produktów
                </p>
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 bg-white border border-blue-300 hover:bg-blue-50 hover:border-blue-500 text-blue-700 font-semibold py-2.5 px-8 rounded-xl transition-colors text-sm shadow-sm"
                >
                  <ChevronDownIcon className="h-4 w-4" />
                  Pokaż więcej
                </button>
              </div>
            )}

            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="mt-8 text-center text-sm text-blue-400">
                Wyświetlono wszystkie {filtered.length} produkty
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-blue-400">
            <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">Brak wyników</p>
            <p className="text-sm mt-1">Spróbuj zmienić wyszukiwanie lub wybierz inną kategorię</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsInner />
    </Suspense>
  );
}
