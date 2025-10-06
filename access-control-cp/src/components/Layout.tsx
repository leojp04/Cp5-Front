import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LayoutProps = {
  children: ReactNode;
};

const makeNavClasses = (isActive: boolean, active: string, inactive: string) =>
  ["btn", isActive ? active : inactive].join(" ");

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link
            to={isAuthenticated ? "/home" : "/login"}
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            access-control-cp
          </Link>

          <nav className="flex flex-wrap items-center gap-2 font-semibold text-slate-600">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/home"
                  className={({ isActive }) => makeNavClasses(isActive, "btn-muted", "btn-outline")}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) => makeNavClasses(isActive, "btn-primary", "btn-outline")}
                >
                  Perfil
                </NavLink>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => makeNavClasses(isActive, "btn-secondary", "btn-outline")}
                >
                  Sair
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => makeNavClasses(isActive, "btn-primary", "btn-muted")}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/cadastro"
                  className={({ isActive }) => makeNavClasses(isActive, "btn-secondary", "btn-outline")}
                >
                  Cadastro
                </NavLink>
              </>
            )}
          </nav>

          {isAuthenticated && user ? (
            <div className="hidden min-w-[180px] flex-col text-right text-sm text-slate-500 sm:flex">
              <span className="text-xs uppercase tracking-wide text-slate-400">Logado como</span>
              <span className="font-semibold text-slate-900">{user.nome}</span>
              <span className="text-xs text-slate-500">{user.email}</span>
            </div>
          ) : (
            <div className="hidden min-w-[180px] text-right text-xs text-slate-400 sm:block">
              Nao autenticado
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200/80 bg-white/80">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-6 text-sm text-slate-500">
          <span>&copy; 2025 access-control-cp</span>
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Interface feita com Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
