import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-center text-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-slate-900">404</h1>
        <p className="section-subtitle">Pagina nao encontrada.</p>
        <Link to="/home" className="btn btn-primary">
          Voltar para a pagina inicial
        </Link>
      </div>
    </section>
  );
}
