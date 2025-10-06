import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="page-center">
        <div className="card-muted">Nenhum usuario autenticado.</div>
      </section>
    );
  }

  return (
    <section className="page-center">
      <div className="card w-full max-w-lg space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">Perfil</h1>
          <p className="section-subtitle">Informacoes do usuario autenticado no momento.</p>
        </header>

        <dl className="grid gap-4 text-sm text-slate-600">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nome</dt>
            <dd className="text-base font-medium text-slate-900">{user.nome}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Usuario</dt>
            <dd className="text-base font-medium text-slate-900">{user.nomeUsuario}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">E-mail</dt>
            <dd className="text-base font-medium text-slate-900">{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
