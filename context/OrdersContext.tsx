"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface OrderItem {
  productId: number;
  productName: string;
  productCode: string;
  quantity: number;
  nettoPrice: number;
  bruttoPrice: number;
}

export type OrderStatus = "Nowe" | "W realizacji" | "Zrealizowane";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  nip: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  items: OrderItem[];
  totalNetto: number;
  totalBrutto: number;
  status: OrderStatus;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (data: Omit<Order, "id" | "orderNumber" | "date" | "status">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const STORAGE_KEY = "b2b_orders_v1";

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (ords: Order[]) => {
    setOrders(ords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ords));
    } catch {
      // ignore
    }
  };

  const addOrder = (data: Omit<Order, "id" | "orderNumber" | "date" | "status">): Order => {
    const id = Date.now().toString();
    const orderNumber = `ZAM-${Date.now().toString().slice(-8)}`;
    const date = new Date().toISOString();
    const order: Order = { ...data, id, orderNumber, date, status: "Nowe" };
    persist([order, ...orders]);
    return order;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    persist(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
