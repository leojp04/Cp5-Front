import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="container flex items-center justify-between gap-3 py-4">
          <Link to="/home" className="text-lg font-semibold tracking-tight text-slate-900">
            access-control-cp
          </Link>

          <nav className="flex items-center gap-2 font-semibold text-slate-600">
            <NavLink
              to="/login"
              className={({ isActive }) => ["btn", isActive ? "btn-primary" : "btn-muted"].join(" ")}
            >
              Login
            </NavLink>
            <NavLink
              to="/cadastro"
              className={({ isActive }) => ["btn", isActive ? "btn-secondary" : "btn-outline"].join(" ")}
            >
              Cadastro
            </NavLink>
          </nav>
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
