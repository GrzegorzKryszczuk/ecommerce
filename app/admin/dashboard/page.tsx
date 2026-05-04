"use client";
import { useState, useRef, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useProducts, ProductFull } from "@/context/ProductsContext";
import { useOrders, Order, OrderStatus } from "@/context/OrdersContext";
import { useRouter } from "next/navigation";
import { NAV_CATEGORIES } from "@/data/products";
import {
  BuildingOffice2Icon,
  ArrowRightStartOnRectangleIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "produkty" | "zamowienia";

interface ProductFormData {
  code: string;
  name: string;
  category: string;
  nettoPrice: string;
  description: string;
  unit: string;
  stock: string;
}

const EMPTY_FORM: ProductFormData = {
  code: "",
  name: "",
  category: NAV_CATEGORIES[0],
  nettoPrice: "",
  description: "",
  unit: "szt",
  stock: "0",
};

const VAT = 1.23;
function toBrutto(netto: number) {
  return Math.round(netto * VAT * 100) / 100;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  Nowe: "bg-blue-100 text-blue-700",
  "W realizacji": "bg-yellow-100 text-yellow-700",
  Zrealizowane: "bg-green-100 text-green-700",
};

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { isAdmin, adminLogout } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) router.replace("/admin");
  }, [isAdmin, router]);

  const [tab, setTab] = useState<Tab>("produkty");

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 rounded-lg p-1.5">
              <BuildingOffice2Icon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">Panel administracyjny</span>
            <span className="text-blue-400 text-sm hidden sm:inline">B2B Shop</span>
          </div>
          <button
            onClick={() => { adminLogout(); router.push("/admin"); }}
            className="flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors"
          >
            <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
            Wyloguj
          </button>
        </div>
      </header>

      {/* Tab nav */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 pt-2">
          {(["produkty", "zamowienia"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-t-lg text-sm font-semibold border-b-2 transition-colors capitalize ${
                tab === t
                  ? "border-blue-700 text-blue-800 bg-blue-50"
                  : "border-transparent text-blue-400 hover:text-blue-700"
              }`}
            >
              {t === "produkty" ? "Produkty" : "Zamówienia"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {tab === "produkty" ? <ProductsTab /> : <OrdersTab />}
      </main>

      <footer className="bg-blue-900 text-blue-300 text-center text-xs py-3">
        Powered by <span className="font-semibold text-white">Grzegorz Kryszczuk</span>
      </footer>
    </div>
  );
}

// ── Products tab ──────────────────────────────────────────────────────────────

function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct, addPhoto, removePhoto, resetToDefaults } =
    useProducts();
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [photoOpenId, setPhotoOpenId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setConfirmDeleteId(null);
    if (editId === id) setEditId(null);
    if (photoOpenId === id) setPhotoOpenId(null);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative sm:w-72">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
          <input
            type="text"
            placeholder="Szukaj produktu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setShowAddForm((v) => !v); setEditId(null); }}
            className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Dodaj produkt
          </button>
          <button
            onClick={() => { if (confirm("Przywrócić domyślną listę 100 produktów? Zmiany zostaną utracone.")) resetToDefaults(); }}
            className="text-xs text-blue-400 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-2 rounded-lg transition-colors"
          >
            Resetuj do domyślnych
          </button>
        </div>
      </div>

      <p className="text-sm text-blue-500">
        Łącznie <span className="font-semibold text-blue-800">{products.length}</span> produktów
        {search && `, wyniki: ${filtered.length}`}
      </p>

      {/* Add product form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">Nowy produkt</span>
            <button onClick={() => setShowAddForm(false)} className="text-blue-300 hover:text-white">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">
            <ProductForm
              initial={EMPTY_FORM}
              onSave={(data) => {
                const netto = parseFloat(data.nettoPrice);
                addProduct({
                  code: data.code,
                  name: data.name,
                  category: data.category,
                  nettoPrice: netto,
                  bruttoPrice: toBrutto(netto),
                  description: data.description,
                  unit: data.unit,
                  stock: parseInt(data.stock) || 0,
                  photos: [],
                });
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Product table */}
      <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <th className="text-left px-4 py-3">Kod</th>
                <th className="text-left px-4 py-3">Nazwa</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Kategoria</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Netto</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Brutto</th>
                <th className="text-right px-4 py-3 hidden lg:table-cell">Stan</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Zdjęcia</th>
                <th className="text-center px-4 py-3">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filtered.map((product) => (
                <>
                  <tr
                    key={product.id}
                    className={`hover:bg-blue-50/50 transition-colors ${editId === product.id ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-blue-500 font-bold whitespace-nowrap">
                      {product.code}
                    </td>
                    <td className="px-4 py-3 text-blue-900 font-medium max-w-xs">
                      <span className="line-clamp-1">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-blue-800 font-semibold whitespace-nowrap">
                      {product.nettoPrice.toFixed(2)} zł
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-red-600 font-semibold whitespace-nowrap">
                      {product.bruttoPrice.toFixed(2)} zł
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span
                        className={`text-xs font-semibold ${
                          product.stock > 10 ? "text-green-600" : product.stock > 3 ? "text-yellow-600" : "text-red-600"
                        }`}
                      >
                        {product.stock} {product.unit}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-blue-400">
                      {product.photos.length > 0 ? (
                        <span className="text-blue-600 font-medium">{product.photos.length} zdjęć</span>
                      ) : (
                        "brak"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          title="Edytuj"
                          onClick={() => {
                            setEditId(editId === product.id ? null : product.id);
                            setPhotoOpenId(null);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            editId === product.id
                              ? "bg-blue-600 text-white"
                              : "text-blue-500 hover:bg-blue-100"
                          }`}
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          title="Zdjęcia"
                          onClick={() => {
                            setPhotoOpenId(photoOpenId === product.id ? null : product.id);
                            setEditId(null);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            photoOpenId === product.id
                              ? "bg-blue-600 text-white"
                              : "text-blue-500 hover:bg-blue-100"
                          }`}
                        >
                          <PhotoIcon className="h-4 w-4" />
                        </button>
                        <button
                          title="Usuń"
                          onClick={() => setConfirmDeleteId(product.id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline edit row */}
                  {editId === product.id && (
                    <tr key={`edit-${product.id}`}>
                      <td colSpan={8} className="px-4 py-4 bg-blue-50 border-t border-blue-100">
                        <ProductForm
                          initial={{
                            code: product.code,
                            name: product.name,
                            category: product.category,
                            nettoPrice: product.nettoPrice.toString(),
                            description: product.description,
                            unit: product.unit,
                            stock: product.stock.toString(),
                          }}
                          onSave={(data) => {
                            const netto = parseFloat(data.nettoPrice);
                            updateProduct(product.id, {
                              code: data.code,
                              name: data.name,
                              category: data.category,
                              nettoPrice: netto,
                              bruttoPrice: toBrutto(netto),
                              description: data.description,
                              unit: data.unit,
                              stock: parseInt(data.stock) || 0,
                            });
                            setEditId(null);
                          }}
                          onCancel={() => setEditId(null)}
                        />
                      </td>
                    </tr>
                  )}

                  {/* Photo manager row */}
                  {photoOpenId === product.id && (
                    <tr key={`photos-${product.id}`}>
                      <td colSpan={8} className="px-4 py-4 bg-blue-50 border-t border-blue-100">
                        <PhotoManager
                          product={product}
                          onAdd={(url) => addPhoto(product.id, url)}
                          onRemove={(idx) => removePhoto(product.id, idx)}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-blue-400 text-sm">
                    Brak produktów pasujących do wyszukiwania.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Usuń produkt</h2>
            <p className="text-sm text-blue-600 mb-5">
              Czy na pewno chcesz usunąć produkt{" "}
              <span className="font-semibold text-blue-900">
                {products.find((p) => p.id === confirmDeleteId)?.name}
              </span>
              ? Tej operacji nie można cofnąć.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                Usuń
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 border border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold py-2 rounded-lg text-sm transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Product form ──────────────────────────────────────────────────────────────

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: ProductFormData;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductFormData>(initial);
  const netto = parseFloat(form.nettoPrice);
  const brutto = isNaN(netto) ? "" : toBrutto(netto).toFixed(2);

  const set = (field: keyof ProductFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Kod produktu *</label>
          <input
            value={form.code}
            onChange={(e) => set("code", e.target.value)}
            required
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Kategoria *</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            {NAV_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Jednostka</label>
          <input
            value={form.unit}
            onChange={(e) => set("unit", e.target.value)}
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-blue-700 mb-1">Nazwa produktu *</label>
        <input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-blue-700 mb-1">Opis</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={2}
          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Cena netto (zł) *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.nettoPrice}
            onChange={(e) => set("nettoPrice", e.target.value)}
            required
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Cena brutto (VAT 23%)</label>
          <input
            readOnly
            value={brutto}
            className="w-full border border-blue-100 bg-blue-50 rounded-lg px-3 py-2 text-sm text-blue-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-700 mb-1">Stan magazynowy</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          <CheckIcon className="h-4 w-4" />
          Zapisz
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}

// ── Photo manager ─────────────────────────────────────────────────────────────

function PhotoManager({
  product,
  onAdd,
  onRemove,
}: {
  product: ProductFull;
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
}) {
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) { setUrlError("Podaj URL zdjęcia."); return; }
    try { new URL(trimmed); } catch { setUrlError("Nieprawidłowy URL."); return; }
    onAdd(trimmed);
    setUrlInput("");
    setUrlError("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") onAdd(result);
    };
    reader.readAsDataURL(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-blue-800">
        Zdjęcia produktu: <span className="font-mono text-blue-500">{product.code}</span>
      </h4>

      {/* Current photos */}
      {product.photos.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {product.photos.map((src, idx) => (
            <div key={idx} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Zdjęcie ${idx + 1}`}
                className="h-24 w-24 object-cover rounded-lg border border-blue-200"
                onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dy='.3em' fill='%2394a3b8'%3EBłąd%3C/text%3E%3C/svg%3E"; }}
              />
              <button
                onClick={() => onRemove(idx)}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
              <span className="text-xs text-blue-400 text-center block mt-0.5">#{idx + 1}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-blue-400 italic">Brak zdjęć dla tego produktu.</p>
      )}

      {/* Add via URL */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-blue-700">Dodaj zdjęcie przez URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
            placeholder="https://example.com/photo.jpg"
            className="flex-1 border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddUrl(); } }}
          />
          <button
            onClick={handleAddUrl}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Dodaj
          </button>
        </div>
        {urlError && <p className="text-red-500 text-xs">{urlError}</p>}
      </div>

      {/* Add via file upload */}
      <div>
        <label className="text-xs font-semibold text-blue-700 block mb-1">Lub wgraj plik z dysku</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <span className="bg-white border border-blue-300 hover:border-blue-500 text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <PhotoIcon className="h-4 w-4" />
            Wybierz plik
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

// ── Orders tab ────────────────────────────────────────────────────────────────

function OrdersTab() {
  const { orders, updateOrderStatus } = useOrders();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-16 text-center">
        <p className="text-lg font-semibold text-blue-400">Brak zamówień</p>
        <p className="text-sm text-blue-300 mt-1">Zamówienia pojawią się tutaj po ich złożeniu przez klientów.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-blue-500">
        Łącznie <span className="font-semibold text-blue-800">{orders.length}</span> zamówień
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <th className="text-left px-4 py-3">Nr zamówienia</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Data</th>
                <th className="text-left px-4 py-3">Firma / NIP</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Kontakt</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Wartość brutto</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Szczegóły</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {orders.map((order) => (
                <>
                  <tr key={order.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-blue-700 font-bold whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-blue-500 text-xs whitespace-nowrap">
                      {new Date(order.date).toLocaleString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-blue-900 text-sm">{order.companyName}</p>
                      <p className="text-xs text-blue-400 font-mono">NIP: {order.nip}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-blue-800 text-sm">{order.contactName}</p>
                      <p className="text-xs text-blue-400">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell font-bold text-red-600 whitespace-nowrap">
                      {order.totalBrutto.toFixed(2)} zł
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${STATUS_COLORS[order.status]}`}
                      >
                        <option value="Nowe">Nowe</option>
                        <option value="W realizacji">W realizacji</option>
                        <option value="Zrealizowane">Zrealizowane</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                        title="Szczegóły zamówienia"
                      >
                        {expandedId === order.id ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedId === order.id && (
                    <tr key={`detail-${order.id}`}>
                      <td colSpan={7} className="px-4 py-4 bg-blue-50 border-t border-blue-100">
                        <OrderDetail order={order} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Order detail ──────────────────────────────────────────────────────────────

function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="space-y-4">
      {/* Contact info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-xs text-blue-400 font-semibold mb-0.5">Kontakt</p>
          <p className="text-blue-800 font-medium">{order.contactName}</p>
          <p className="text-blue-500 text-xs">{order.email}</p>
          <p className="text-blue-500 text-xs">{order.phone}</p>
        </div>
        <div>
          <p className="text-xs text-blue-400 font-semibold mb-0.5">Firma</p>
          <p className="text-blue-800 font-medium">{order.companyName}</p>
          <p className="text-blue-500 text-xs font-mono">NIP: {order.nip}</p>
        </div>
        {order.notes && (
          <div>
            <p className="text-xs text-blue-400 font-semibold mb-0.5">Uwagi</p>
            <p className="text-blue-700 text-xs">{order.notes}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-blue-50 text-blue-500 font-semibold uppercase tracking-wider">
              <th className="text-left px-3 py-2">Kod</th>
              <th className="text-left px-3 py-2">Produkt</th>
              <th className="text-right px-3 py-2">Ilość</th>
              <th className="text-right px-3 py-2">Netto/szt</th>
              <th className="text-right px-3 py-2">Brutto razem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-3 py-2 font-mono text-blue-400">{item.productCode}</td>
                <td className="px-3 py-2 text-blue-800 font-medium">{item.productName}</td>
                <td className="px-3 py-2 text-right text-blue-700">{item.quantity}</td>
                <td className="px-3 py-2 text-right text-blue-700">{item.nettoPrice.toFixed(2)} zł</td>
                <td className="px-3 py-2 text-right font-semibold text-red-600">
                  {(item.bruttoPrice * item.quantity).toFixed(2)} zł
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-bold">
              <td colSpan={3} className="px-3 py-2 text-blue-700">Razem</td>
              <td className="px-3 py-2 text-right text-blue-800">{order.totalNetto.toFixed(2)} zł</td>
              <td className="px-3 py-2 text-right text-red-600">{order.totalBrutto.toFixed(2)} zł</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
