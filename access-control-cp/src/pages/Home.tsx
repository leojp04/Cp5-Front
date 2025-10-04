import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Home</h1>
      <p className="text-zinc-400">{user ? `Bem-vindo, ${user.nome}.` : "Bem-vindo."}</p>
      {user && (
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm">Usuário: <span className="font-medium">{user.nomeUsuario}</span></p>
          <p className="text-sm">E-mail: <span className="font-medium">{user.email}</span></p>
        </div>
      )}
    </main>
  );
}
