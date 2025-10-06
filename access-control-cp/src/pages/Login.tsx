import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  nomeUsuario: z.string().min(3, "Informe seu nome de usuario (min. 3)").trim(),
  email: z.string().email({ message: "E-mail invalido" }).trim(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nomeUsuario: "", email: "" },
  });

  async function onSubmit() {
    navigate("/home");
  }

  return (
    <section className="page-center">
      <div className="card w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
          <p className="section-subtitle">
            Acesse para acompanhar os cadastros e gerenciar os usuarios.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="nomeUsuario" className="text-sm font-medium text-slate-700">
              Nome de usuario
            </label>
            <input
              id="nomeUsuario"
              className="input"
              {...register("nomeUsuario")}
              placeholder="seu.usuario"
              autoComplete="username"
            />
            {errors.nomeUsuario && (
              <p className="text-sm font-medium text-rose-600">{errors.nomeUsuario.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="input"
              {...register("email")}
              placeholder="voce@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm font-medium text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="muted text-center">
          Nao tem conta? {" "}
          <Link to="/cadastro" className="font-semibold text-sky-600 hover:text-sky-700">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}
