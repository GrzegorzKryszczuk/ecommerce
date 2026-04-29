"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import {
  TrashIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalNetto, totalBrutto } = useCart();
  const { user } = useAuth();
  const [ordered, setOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [note, setNote] = useState("");

  const handleOrder = () => {
    const num = `ZAM-${Date.now().toString().slice(-8)}`;
    setOrderNumber(num);
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-blue-50">
          <Header />
          <main className="max-w-xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-10">
              <div className="bg-green-100 rounded-full p-5 w-fit mx-auto mb-5">
                <CheckCircleIcon className="h-14 w-14 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">Zamówienie złożone!</h1>
              <p className="text-blue-500 mb-4">Twoje zamówienie zostało przyjęte do realizacji.</p>
              <div className="bg-blue-50 rounded-xl px-6 py-4 mb-6">
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Numer zamówienia</p>
                <p className="text-2xl font-mono font-bold text-blue-800 mt-1">{orderNumber}</p>
                <p className="text-xs text-blue-400 mt-2">Firma: {user?.company}</p>
              </div>
              <p className="text-sm text-blue-500 mb-6">
                Nasz handlowiec skontaktuje się z Tobą w celu potwierdzenia zamówienia i ustalenia terminu dostawy.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Wróć do katalogu
              </Link>
            </div>
          </main>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-blue-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Koszyk zamówień</h1>
              <p className="text-blue-500 text-sm mt-0.5">{user?.company}</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <ArrowLeftIcon className="h-4 w-4" />
              Kontynuuj zakupy
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-16 text-center">
              <ShoppingCartIcon className="h-16 w-16 text-blue-200 mx-auto mb-4" />
              <p className="text-lg font-semibold text-blue-400">Koszyk jest pusty</p>
              <p className="text-sm text-blue-300 mt-1 mb-6">Dodaj produkty z katalogu</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm"
              >
                Przejdź do katalogu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 flex gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-xs font-mono text-blue-400 font-bold">{item.product.code}</span>
                          <h3 className="text-sm font-semibold text-blue-900 leading-snug">{item.product.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                          title="Usuń"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                        {/* Prices */}
                        <div className="flex gap-3 text-xs">
                          <span className="text-blue-500">
                            Netto: <span className="font-bold text-blue-800">{item.product.nettoPrice.toFixed(2)} zł</span>
                          </span>
                          <span className="text-blue-400">|</span>
                          <span className="text-blue-500">
                            Brutto: <span className="font-bold text-red-600">{item.product.bruttoPrice.toFixed(2)} zł</span>
                          </span>
                          <span className="text-blue-400">/ {item.product.unit}</span>
                        </div>
                        {/* Qty control */}
                        <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 font-bold text-sm transition-colors"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-sm font-bold text-blue-900 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 font-bold text-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Line total */}
                      <div className="flex justify-end mt-2 pt-2 border-t border-blue-50 gap-4 text-xs">
                        <span className="text-blue-500">
                          Łącznie netto: <span className="font-bold text-blue-800">{(item.product.nettoPrice * item.quantity).toFixed(2)} zł</span>
                        </span>
                        <span className="text-blue-500">
                          Łącznie brutto: <span className="font-bold text-red-600">{(item.product.bruttoPrice * item.quantity).toFixed(2)} zł</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="w-full text-sm text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
                >
                  Wyczyść koszyk
                </button>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
                  <h2 className="font-bold text-blue-900 mb-4 text-base">Podsumowanie</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-500">Pozycji w koszyku:</span>
                      <span className="font-semibold text-blue-800">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-500">Razem netto:</span>
                      <span className="font-bold text-blue-900">{totalNetto.toFixed(2)} zł</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-500">VAT (23%):</span>
                      <span className="text-blue-700">{(totalBrutto - totalNetto).toFixed(2)} zł</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-100">
                      <span className="font-bold text-blue-800">Razem brutto:</span>
                      <span className="font-bold text-red-600 text-lg">{totalBrutto.toFixed(2)} zł</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
                  <h3 className="font-bold text-blue-900 mb-3 text-sm">Uwagi do zamówienia</h3>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Dodatkowe informacje, termin dostawy, itp."
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
                  <p className="text-xs text-blue-400 mb-4">
                    Zamówienie zostanie przekazane do działu sprzedaży. Płatność i warunki ustalone indywidualnie z kontrahentem.
                  </p>
                  <button
                    onClick={handleOrder}
                    className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 rounded-xl transition-colors text-sm tracking-wide"
                  >
                    Złóż zamówienie
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
