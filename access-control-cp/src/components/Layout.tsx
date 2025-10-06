import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-secondary">access-control-cp</Link>
          <nav className="flex gap-3">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/cadastro" className="btn-secondary">Cadastro</Link>
          </nav>
        </div>
      </header>
      <main className="page">{children}</main>
      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-slate-500">
          © 2025 access-control-cp
        </div>
      </footer>
    </div>
  );
}
