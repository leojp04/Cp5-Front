import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-zinc-800/40 bg-zinc-900/40 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">access-control-cp</Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/cadastro" className="hover:underline">Cadastro</Link>
        </nav>

        <div className="text-right">
          {user ? (
            <>
              <p className="text-xs text-zinc-400">Logado como</p>
              <p className="text-sm font-medium">
                {user.nome} <span className="text-zinc-400">({user.email})</span>
              </p>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="mt-1 text-xs underline"
              >
                sair
              </button>
            </>
          ) : (
            <p className="text-xs text-zinc-500">não autenticado</p>
          )}
        </div>
      </div>
    </header>
  );
}
