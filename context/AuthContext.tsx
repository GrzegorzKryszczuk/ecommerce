"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  company: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DEMO_USERS = [
  { id: "1", username: "admin", password: "admin123", company: "Firma ABC Sp. z o.o.", email: "admin@firmaabc.pl" },
  { id: "2", username: "jan.kowalski", password: "haslo123", company: "XYZ Trading S.A.", email: "j.kowalski@xyz.pl" },
  { id: "3", username: "demo", password: "demo", company: "Demo Company", email: "demo@example.pl" },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ id: found.id, username: found.username, company: found.company, email: found.email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
