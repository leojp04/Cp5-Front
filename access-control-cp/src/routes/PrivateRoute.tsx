
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
