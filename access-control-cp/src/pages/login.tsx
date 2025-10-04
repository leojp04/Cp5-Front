import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { findByCredentials } from "../services/usuarios";

const schema = z.object({
  nomeUsuario: z.string().min(3, "Informe seu nome de usuário (mín. 3)"),
  email: z.string().email("E-mail inválido"),
});
type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nomeUsuario: "", email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const user = await findByCredentials(data.nomeUsuario, data.email);
      if (!user) {
        setError("nomeUsuario", { message: "Credenciais não conferem." });
        setError("email", { message: "Credenciais não conferem." });
        return;
      }

      localStorage.setItem("access-control:user", JSON.stringify(user));
      reset();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao validar. Verifique se o json-server está rodando na porta 3001.");
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome de usuário</label>
            <input
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="ex.: leonardo.p"
              {...register("nomeUsuario")}
              autoComplete="username"
            />
            {errors.nomeUsuario && <p className="text-xs text-red-400 mt-1">{errors.nomeUsuario.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="voce@exemplo.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-white/10 hover:bg-white/20 py-2 transition"
            type="submit"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-4">
          Não tem conta? <Link to="/cadastro" className="underline">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
}
