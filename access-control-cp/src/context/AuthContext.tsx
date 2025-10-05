/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AUTH_STORAGE_KEY } from "../config";

type User = {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

type PersistMode = "local" | "session";

type AuthCtx = {
  user: User | null;
  ready: boolean;
  authenticate: (u: User, remember: boolean) => void;
  logout: () => void;
};

export const Context = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [persistMode, setPersistMode] = useState<PersistMode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
      return;
    }

    const storages: Array<[Storage, PersistMode]> = [
      [window.sessionStorage, "session"],
      [window.localStorage, "local"],
    ];

    for (const [storage, mode] of storages) {
      try {
        const raw = storage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
          setPersistMode(mode);
          break;
        }
      } catch {
        storage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!user) {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    const serialized = JSON.stringify(user);

    if (persistMode === "local") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, serialized);
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user, persistMode]);

  const authenticate = useCallback((u: User, remember: boolean) => {
    setPersistMode(remember ? "local" : "session");
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    setPersistMode(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      ready,
      authenticate,
      logout,
    }),
    [user, ready, authenticate, logout]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider />");
  return ctx;
}