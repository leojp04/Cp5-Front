import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="w-full border-b border-zinc-800/40 bg-zinc-900/40 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="font-semibold">access-control-cp</Link>

        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/perfil" className="hover:underline">Perfil</Link>
              <Link to="/logout" className="hover:underline">Sair</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/cadastro" className="hover:underline">Cadastro</Link>
            </>
          )}
        </nav>

        <div className="text-right min-w-[180px]">
          {user ? (
            <>
              <p className="text-xs text-zinc-400">Logado como</p>
              <p className="text-sm font-medium">
                {user.nome} <span className="text-zinc-400">({user.email})</span>
              </p>
            </>
          ) : (
            <p className="text-xs text-zinc-500">nao autenticado</p>
          )}
        </div>
      </div>
    </header>
  );
}