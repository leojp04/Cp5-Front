/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type User = {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

type AuthCtx = {
  user: User | null;
  setUser: (u: User | null) => void;
  ready: boolean;
  logout: () => void;
};

export const Context = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("access-control:user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem("access-control:user");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("access-control:user", JSON.stringify(user));
    else localStorage.removeItem("access-control:user");
  }, [user]);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      setUser,
      ready,
      logout: () => setUser(null),
    }),
    [user, ready]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider />");
  return ctx;
}
