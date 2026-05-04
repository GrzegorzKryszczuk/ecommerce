"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import Header from "@/components/Header";
import Link from "next/link";
import {
  TrashIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

interface OrderForm {
  nip: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  note: string;
}

type Step = "cart" | "form" | "success";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalNetto, totalBrutto } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState<Step>("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState<OrderForm>({
    nip: "",
    company: "",
    fullName: "",
    email: "",
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const handleField = (field: keyof OrderForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<OrderForm> = {};
    if (!form.nip.trim()) errs.nip = "Podaj NIP";
    else if (!/^\d{10}$/.test(form.nip.replace(/-/g, ""))) errs.nip = "NIP musi mieć 10 cyfr";
    if (!form.company.trim()) errs.company = "Podaj nazwę firmy";
    if (!form.fullName.trim()) errs.fullName = "Podaj imię i nazwisko";
    if (!form.email.trim()) errs.email = "Podaj e-mail";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Nieprawidłowy adres e-mail";
    if (!form.phone.trim()) errs.phone = "Podaj numer telefonu";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const order = addOrder({
      nip: form.nip,
      companyName: form.company,
      contactName: form.fullName,
      email: form.email,
      phone: form.phone,
      notes: form.note,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productCode: i.product.code,
        quantity: i.quantity,
        nettoPrice: i.product.nettoPrice,
        bruttoPrice: i.product.bruttoPrice,
      })),
      totalNetto,
      totalBrutto,
    });
    setOrderNumber(order.orderNumber);
    clearCart();
    setStep("success");
  };

  // ── Success ─────────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <main className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-10">
            <div className="bg-green-100 rounded-full p-5 w-fit mx-auto mb-5">
              <CheckCircleIcon className="h-14 w-14 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Zamówienie złożone!</h1>
            <p className="text-blue-500 mb-4">
              Twoje zamówienie zostało przyjęte do realizacji.
            </p>
            <div className="bg-blue-50 rounded-xl px-6 py-4 mb-4">
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Numer zamówienia
              </p>
              <p className="text-2xl font-mono font-bold text-blue-800 mt-1">{orderNumber}</p>
            </div>
            <div className="bg-blue-50 rounded-xl px-6 py-3 mb-6 text-left text-sm space-y-1">
              <p><span className="text-blue-400">Firma:</span> <span className="font-semibold text-blue-800">{form.company}</span></p>
              <p><span className="text-blue-400">NIP:</span> <span className="font-semibold text-blue-800">{form.nip}</span></p>
              <p><span className="text-blue-400">Kontakt:</span> <span className="font-semibold text-blue-800">{form.fullName}</span></p>
              <p><span className="text-blue-400">E-mail:</span> <span className="font-semibold text-blue-800">{form.email}</span></p>
            </div>
            <p className="text-sm text-blue-500 mb-6">
              Nasz handlowiec skontaktuje się z Tobą w celu potwierdzenia zamówienia
              i ustalenia warunków dostawy.
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
    );
  }

  // ── Order form ───────────────────────────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => setStep("cart")}
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium mb-5 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Wróć do koszyka
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
              <div className="flex items-center gap-3">
                <ClipboardDocumentListIcon className="h-7 w-7 text-blue-300" />
                <div>
                  <h1 className="text-white text-xl font-bold">Dane do zamówienia</h1>
                  <p className="text-blue-300 text-sm">Wypełnij formularz — zamówienie bez płatności</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
              {/* NIP + Nazwa firmy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                    NIP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="1234567890"
                    value={form.nip}
                    onChange={(e) => handleField("nip", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.nip ? "border-red-400 bg-red-50" : "border-blue-200"
                    }`}
                  />
                  {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                    Nazwa firmy <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Firma Sp. z o.o."
                    value={form.company}
                    onChange={(e) => handleField("company", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.company ? "border-red-400 bg-red-50" : "border-blue-200"
                    }`}
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>

              {/* Imię i Nazwisko */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                  Imię i Nazwisko <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jan Kowalski"
                  value={form.fullName}
                  onChange={(e) => handleField("fullName", e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.fullName ? "border-red-400 bg-red-50" : "border-blue-200"
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Email + Telefon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                    Adres e-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jan.kowalski@firma.pl"
                    value={form.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.email ? "border-red-400 bg-red-50" : "border-blue-200"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+48 600 000 000"
                    value={form.phone}
                    onChange={(e) => handleField("phone", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.phone ? "border-red-400 bg-red-50" : "border-blue-200"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Uwagi */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 mb-1.5">
                  Uwagi do zamówienia <span className="text-blue-300 font-normal">(opcjonalne)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Termin dostawy, adres, dodatkowe informacje..."
                  value={form.note}
                  onChange={(e) => handleField("note", e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              {/* Summary in form */}
              <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                <div className="text-sm text-blue-600">
                  <span className="font-semibold text-blue-900">{items.length}</span> pozycji ·{" "}
                  <span className="font-semibold text-blue-900">{totalNetto.toFixed(2)} zł</span> netto
                </div>
                <div className="text-base font-bold text-red-600">
                  {totalBrutto.toFixed(2)} zł brutto
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm tracking-wide"
              >
                Złóż zamówienie
              </button>

              <p className="text-xs text-blue-400 text-center">
                Zamówienie bez płatności — handlowiec skontaktuje się z Tobą w ciągu 1 dnia roboczego.
              </p>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // ── Cart view ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Koszyk zamówień</h1>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
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
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl shadow-sm border border-blue-100 p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
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

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-3 text-xs">
                      <span className="text-blue-500">
                        Netto:{" "}
                        <span className="font-bold text-blue-800">{item.product.nettoPrice.toFixed(2)} zł</span>
                      </span>
                      <span className="text-blue-400">|</span>
                      <span className="text-blue-500">
                        Brutto:{" "}
                        <span className="font-bold text-red-600">{item.product.bruttoPrice.toFixed(2)} zł</span>
                      </span>
                      <span className="text-blue-400">/ {item.product.unit}</span>
                    </div>
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

                  <div className="flex justify-end mt-2 pt-2 border-t border-blue-50 gap-4 text-xs">
                    <span className="text-blue-500">
                      Netto:{" "}
                      <span className="font-bold text-blue-800">
                        {(item.product.nettoPrice * item.quantity).toFixed(2)} zł
                      </span>
                    </span>
                    <span className="text-blue-500">
                      Brutto:{" "}
                      <span className="font-bold text-red-600">
                        {(item.product.bruttoPrice * item.quantity).toFixed(2)} zł
                      </span>
                    </span>
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
                    <span className="text-blue-500">Pozycji:</span>
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

              <button
                onClick={() => setStep("form")}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm tracking-wide"
              >
                Przejdź do zamówienia →
              </button>

              <p className="text-xs text-blue-400 text-center">
                Brak płatności — zamówienie bez zobowiązań
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
