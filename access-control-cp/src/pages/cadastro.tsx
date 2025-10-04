import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Definição do Schema de Validação (Requisito 5 e 6)
const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome completo é obrigatório e deve ter no mínimo 3 caracteres.'),
  nomeUsuario: z
    .string()
    .min(3, 'O nome de usuário é obrigatório e deve ter no mínimo 3 caracteres.'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;

export function Cadastro() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema)
  });

  const onSubmit = (data: CadastroFormData) => {
    // Requisito 7: A lógica de CADASTRO será implementada aqui
    console.log("Dados prontos para o cadastro:", data);
    // TODO: Implementar verificação de duplicidade (GET) e cadastro (POST)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Crie sua Conta
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Campo Nome Completo */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input 
              id="nome" 
              type="text"
              {...register('nome')}
              className={`w-full p-3 mt-1 border rounded-lg transition duration-150 ${
                errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } focus:border-blue-500 focus:outline-none`}
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{errors.nome.message}</p>
            )}
          </div>
          
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
            className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 disabled:opacity-50 mt-6"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  );
}