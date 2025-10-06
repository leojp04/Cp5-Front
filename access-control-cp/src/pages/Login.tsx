import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  nomeUsuario: z.string().min(3, "Informe seu nome de usuário (mín. 3)"),
  email: z.string().email({ message: "E-mail inválido" }),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nomeUsuario: "", email: "" },
  });

  async function onSubmit() {
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-2xl font-semibold mb-4 text-secondary">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nome de usuário</label>
          <input className="input" {...register("nomeUsuario")} placeholder="seunome" />
          {errors.nomeUsuario && <p className="text-sm text-red-600 mt-1">{errors.nomeUsuario.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input className="input" {...register("email")} placeholder="voce@email.com" />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <button type="submit" className="btn w-full" disabled={isSubmitting}>Entrar</button>
      </form>
      <p className="text-sm mt-4">
        Não tem conta? <Link to="/cadastro" className="text-primary underline">Cadastre-se</Link>
      </p>
    </div>
  );
}
