import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Definição do Schema de Validação (Requisito 4 e 6)
const loginSchema = z.object({
  nomeUsuario: z
    .string()
    .min(1, 'O nome de usuário é obrigatório.'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    // Requisito 8: A lógica de LOGIN será implementada aqui
    console.log("Dados prontos para o login:", data);
    // TODO: Implementar requisição GET ao json-server e salvar em localStorage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Acesso ao Sistema
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Campo Nome de Usuário */}
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
              Nome de Usuário
            </label>
            <input 
              id="nomeUsuario" 
              type="text"
              {...register('nomeUsuario')}
              className={`w-full p-3 mt-1 border rounded-lg transition duration-150 ${
                errors.nomeUsuario ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:outline-none`}
            />
            {/* Exibição da mensagem de erro (Requisito 6) */}
            {errors.nomeUsuario && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{errors.nomeUsuario.message}</p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input 
              id="email" 
              type="email"
              {...register('email')}
              className={`w-full p-3 mt-1 border rounded-lg transition duration-150 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{errors.email.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50"
          >
            {isSubmitting ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
        
        {/* Link para Cadastro (Requisito 3) */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}