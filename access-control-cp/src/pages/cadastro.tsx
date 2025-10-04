import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { createUsuario, existsDuplicate } from "../services/usuarios";

const schema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  nomeUsuario: z.string().min(3, "Escolha um nome de usuário (mín. 3)"),
  email: z.string().email("E-mail inválido"),
});
type FormData = z.infer<typeof schema>;

export default function Cadastro() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", nomeUsuario: "", email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const dup = await existsDuplicate(data.nomeUsuario, data.email);
      if (dup?.nomeUsuario) {
        setError("nomeUsuario", { message: "Este nome de usuário já está em uso." });
      }
      if (dup?.email) {
        setError("email", { message: "Este e-mail já está cadastrado." });
      }
      if (dup?.nomeUsuario || dup?.email) return;

      await createUsuario({
        nome: data.nome,
        nomeUsuario: data.nomeUsuario,
        email: data.email,
      });

      reset();
      alert("Cadastro realizado! Faça login para continuar.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Erro ao cadastrar. Verifique se o json-server está rodando na porta 3001.");
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Cadastro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="Seu nome completo"
              {...register("nome")}
              autoComplete="name"
            />
            {errors.nome && <p className="text-xs text-red-400 mt-1">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Nome de usuário</label>
            <input
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="ex.: maria.silva"
              {...register("nomeUsuario")}
              autoComplete="username"
            />
            {errors.nomeUsuario && (
              <p className="text-xs text-red-400 mt-1">{errors.nomeUsuario.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input
              type="email"
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
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-4">
          Já tem conta? <Link to="/login" className="underline">Fazer login</Link>
        </p>
      </div>
    </main>
  );
}
