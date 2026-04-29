"use client";
import { useState, use } from "react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface EditableProduct {
  name: string;
  code: string;
  category: string;
  nettoPrice: string;
  description: string;
  unit: string;
  stock: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const original = PRODUCTS.find((p) => p.id === Number(id));

  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState<EditableProduct>({
    name: original?.name ?? "",
    code: original?.code ?? "",
    category: original?.category ?? "",
    nettoPrice: original?.nettoPrice.toString() ?? "",
    description: original?.description ?? "",
    unit: original?.unit ?? "",
    stock: original?.stock.toString() ?? "",
  });
  const [localProduct, setLocalProduct] = useState(original);

  if (!localProduct) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-blue-500">
          <p className="text-lg font-medium">Produkt nie został znaleziony</p>
          <Link href="/products" className="mt-4 inline-block text-blue-700 underline">
            Wróć do katalogu
          </Link>
        </div>
      </div>
    );
  }

  const VAT = 1.23;
  const computedBrutto = (parseFloat(form.nettoPrice) * VAT) || localProduct.bruttoPrice;

  const handleSave = () => {
    const netto = parseFloat(form.nettoPrice);
    setLocalProduct({
      ...localProduct,
      name: form.name,
      code: form.code,
      category: form.category,
      nettoPrice: netto,
      bruttoPrice: Math.round(netto * VAT * 100) / 100,
      description: form.description,
      unit: form.unit,
      stock: parseInt(form.stock) || 0,
    });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddToCart = () => {
    addToCart(localProduct, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleChange = (field: keyof EditableProduct, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Powrót do katalogu
        </Link>

        {saved && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm font-medium flex items-center gap-2">
            <CheckIcon className="h-4 w-4" />
            Zmiany zostały zapisane pomyślnie
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-blue-300 text-xs font-mono font-bold tracking-widest">{localProduct.code}</span>
                <h1 className="text-white text-xl font-bold mt-1 leading-tight">{localProduct.name}</h1>
                <span className="inline-block mt-2 text-xs font-medium bg-blue-600 text-blue-100 px-2.5 py-1 rounded-full">
                  {localProduct.category}
                </span>
              </div>
              <button
                onClick={() => {
                  if (editMode) {
                    setForm({
                      name: localProduct.name,
                      code: localProduct.code,
                      category: localProduct.category,
                      nettoPrice: localProduct.nettoPrice.toString(),
                      description: localProduct.description,
                      unit: localProduct.unit,
                      stock: localProduct.stock.toString(),
                    });
                  }
                  setEditMode((v) => !v);
                }}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                  editMode
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white text-blue-800 hover:bg-blue-50"
                }`}
              >
                {editMode ? "Anuluj" : "Edytuj kartę"}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {editMode ? (
              <form
                onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-blue-700 mb-1">Kod produktu</label>
                    <input
                      value={form.code}
                      onChange={(e) => handleChange("code", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-700 mb-1">Kategoria</label>
                    <input
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1">Nazwa produktu</label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1">Opis</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={3}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-blue-700 mb-1">Cena netto (zł)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.nettoPrice}
                      onChange={(e) => handleChange("nettoPrice", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-700 mb-1">Cena brutto (VAT 23%)</label>
                    <input
                      readOnly
                      value={computedBrutto.toFixed(2)}
                      className="w-full border border-blue-100 bg-blue-50 rounded-lg px-3 py-2 text-sm text-blue-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-700 mb-1">Jednostka</label>
                    <input
                      value={form.unit}
                      onChange={(e) => handleChange("unit", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="sm:w-1/3">
                  <label className="block text-xs font-semibold text-blue-700 mb-1">Stan magazynowy</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Zapisz zmiany
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 border border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Anuluj
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Opis produktu</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">{localProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">Cena netto</p>
                    <p className="text-2xl font-bold text-blue-900">{localProduct.nettoPrice.toFixed(2)} zł</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Cena brutto (z VAT 23%)</p>
                    <p className="text-2xl font-bold text-red-600">{localProduct.bruttoPrice.toFixed(2)} zł</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-blue-400 font-semibold mb-0.5">Kod produktu</p>
                    <p className="font-mono font-bold text-blue-900">{localProduct.code}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 font-semibold mb-0.5">Jednostka</p>
                    <p className="font-semibold text-blue-800">{localProduct.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 font-semibold mb-0.5">Stan magazynu</p>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${localProduct.stock > 10 ? "bg-green-400" : localProduct.stock > 3 ? "bg-yellow-400" : "bg-red-400"}`} />
                      <span className="font-semibold text-blue-800">{localProduct.stock} {localProduct.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-blue-100 pt-5">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-blue-600 hover:bg-blue-50 font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-blue-900 min-w-[3rem] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="px-3 py-2 text-blue-600 hover:bg-blue-50 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all duration-150 ${
                        addedToCart
                          ? "bg-green-500 text-white"
                          : "bg-blue-700 hover:bg-blue-800 text-white"
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          Dodano do koszyka!
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon className="h-4 w-4" />
                          Dodaj do koszyka ({(localProduct.bruttoPrice * qty).toFixed(2)} zł)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
