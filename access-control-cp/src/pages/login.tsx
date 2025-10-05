import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { findByCredentials } from "../services/usuarios";

const schema = z.object({
  nomeUsuario: z.string().min(3, "Informe seu nome de usuario (min. 3)").trim(),
  email: z.string().email({ message: "E-mail invalido" }).trim(),
  remember: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { user, authenticate } = useAuth();
  const [authError, setAuthError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nomeUsuario: "", email: "", remember: false },
  });

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (data: FormData) => {
    setAuthError("");
    try {
      const credentialUser = await findByCredentials(data.nomeUsuario, data.email);
      if (!credentialUser) {
        setAuthError("Credenciais nao conferem.");
        return;
      }
      authenticate(credentialUser, Boolean(data.remember));
      reset({ nomeUsuario: "", email: "", remember: Boolean(data.remember) });
      navigate("/", { replace: true });
    } catch {
      setAuthError("Erro ao validar. Verifique o json-server na porta 3001.");
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm mb-1">Nome de usuario</label>
            <input
              id="nomeUsuario"
              className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${errors.nomeUsuario ? "border-red-500 bg-red-950/30 focus:ring-red-700" : "border-zinc-800 bg-zinc-900 focus:ring-zinc-700"}`}
              placeholder="ex.: leonardo.p"
              {...register("nomeUsuario")}
              autoComplete="username"
              autoFocus
            />
            {errors.nomeUsuario && <p className="text-xs text-red-400 mt-1">{errors.nomeUsuario.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${errors.email ? "border-red-500 bg-red-950/30 focus:ring-red-700" : "border-zinc-800 bg-zinc-900 focus:ring-zinc-700"}`}
              placeholder="voce@exemplo.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-700"
              {...register("remember")}
            />
            Lembrar de mim neste dispositivo
          </label>
          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-60 py-2 transition focus:outline-none focus:ring-2 focus:ring-zinc-600"
            type="submit"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {authError && <p className="text-sm text-red-400 mt-3">{authError}</p>}
        <p className="text-sm text-zinc-400 mt-4">
          Nao tem conta? <Link to="/cadastro" className="underline">Cadastre-se</Link>
        </p>
      </div>
    </main>
  );
}