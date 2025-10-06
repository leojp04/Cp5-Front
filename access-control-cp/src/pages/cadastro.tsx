import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createUsuario, existsDuplicate } from "../services/usuarios";

const schema = z.object({
  nome: z.string().min(3, "Informe seu nome completo").trim(),
  nomeUsuario: z.string().min(3, "Escolha um nome de usuario (min. 3)").trim(),
  email: z.string().email("E-mail invalido").trim(),
});

type FormData = z.infer<typeof schema>;

export default function Cadastro() {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [submitError, setSubmitError] = useState("");

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
    setSubmitError("");

    try {
      const dup = await existsDuplicate(data.nomeUsuario, data.email);
      if (dup?.nomeUsuario) {
        setError("nomeUsuario", { message: "Este nome de usuario ja esta em uso." });
      }
      if (dup?.email) {
        setError("email", { message: "Este e-mail ja esta cadastrado." });
      }
      if (dup?.nomeUsuario || dup?.email) return;

      const novoUsuario = await createUsuario({
        nome: data.nome,
        nomeUsuario: data.nomeUsuario,
        email: data.email,
      });

      authenticate(novoUsuario, true);
      reset();
      navigate("/perfil", { replace: true });
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setSubmitError("Erro ao cadastrar. Verifique se o json-server esta rodando na porta 3001.");
    }
  };

  return (
    <section className="page-center">
      <div className="card w-full max-w-lg space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Cadastro</h1>
          <p className="section-subtitle">
            Crie sua conta para acessar as funcoes de controle de acesso.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium text-slate-700">
              Nome completo
            </label>
            <input
              id="nome"
              className="input"
              placeholder="Seu nome completo"
              {...register("nome")}
              autoComplete="name"
            />
            {errors.nome && <p className="text-sm font-medium text-rose-600">{errors.nome.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="nomeUsuario" className="text-sm font-medium text-slate-700">
              Nome de usuario
            </label>
            <input
              id="nomeUsuario"
              className="input"
              placeholder="ex.: maria.silva"
              {...register("nomeUsuario")}
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
              placeholder="voce@exemplo.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && <p className="text-sm font-medium text-rose-600">{errors.email.message}</p>}
          </div>

          {submitError && <div className="status-error">{submitError}</div>}

          <button
            disabled={isSubmitting}
            className="btn btn-secondary w-full"
            type="submit"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </section>
  );
}
