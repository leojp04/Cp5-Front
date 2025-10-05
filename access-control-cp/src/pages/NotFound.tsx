import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-4 text-center">
      <div>
        <h1 className="text-4xl font-semibold mb-4">404</h1>
        <p className="text-zinc-400 mb-6">Pagina nao encontrada.</p>
        <Link to="/" className="underline text-sm">Voltar para a pagina inicial</Link>
      </div>
    </main>
  );
}