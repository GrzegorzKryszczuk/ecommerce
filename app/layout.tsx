import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "B2B Shop — Platforma zamówień",
  description: "Profesjonalna platforma zamówień B2B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col bg-blue-50">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">{children}</div>
              <footer className="bg-blue-900 text-blue-300 text-center text-xs py-3 mt-auto">
                Powered by{" "}
                <span className="font-semibold text-white">Grzegorz Kryszczuk</span>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
