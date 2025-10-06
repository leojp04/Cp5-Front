import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="page space-y-6">
      <header className="space-y-2">
        <h1 className="section-title">Painel</h1>
        <p className="section-subtitle">
          Centralize as informacoes dos usuarios registrados na plataforma.
        </p>
      </header>

      {user ? (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Resumo do usuario autenticado</h2>
          <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nome</dt>
              <dd className="text-base font-medium text-slate-900">{user.nome}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Usuario</dt>
              <dd className="text-base font-medium text-slate-900">{user.nomeUsuario}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">E-mail</dt>
              <dd className="text-base font-medium text-slate-900">{user.email}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="card-muted">
          Nenhum usuario autenticado no momento. Faca login para visualizar os dados.
        </div>
      )}
    </section>
  );
}
