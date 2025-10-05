import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center p-4">
        <p className="text-sm text-zinc-400">Nenhum usuario autenticado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-6">Perfil</h1>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-zinc-400 uppercase tracking-wide text-xs">Nome</dt>
            <dd className="text-zinc-100">{user.nome}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 uppercase tracking-wide text-xs">Nome de usuario</dt>
            <dd className="text-zinc-100">{user.nomeUsuario}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 uppercase tracking-wide text-xs">E-mail</dt>
            <dd className="text-zinc-100">{user.email}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}