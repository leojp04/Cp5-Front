import { apiGet, apiPost } from "./api";

export type Usuario = {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

export type NovoUsuario = Omit<Usuario, "id">;

export async function listarUsuarios() {
  return apiGet<Usuario[]>("/usuarios");
}

export async function findByCredentials(nomeUsuario: string, email: string) {
  const q = `/usuarios?nomeUsuario=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(email)}`;
  const data = await apiGet<Usuario[]>(q);
  return data[0] ?? null;
}

export async function existsDuplicate(nomeUsuario: string, email: string) {
  const [usuarioDuplicado, emailDuplicado] = await Promise.all([
    apiGet<Usuario[]>(`/usuarios?nomeUsuario=${encodeURIComponent(nomeUsuario)}`),
    apiGet<Usuario[]>(`/usuarios?email=${encodeURIComponent(email)}`),
  ]);

  return {
    nomeUsuario: usuarioDuplicado.length > 0,
    email: emailDuplicado.length > 0,
  };
}

export async function createUsuario(user: NovoUsuario) {
  return apiPost<Usuario>("/usuarios", user);
}


export const criarUsuario = createUsuario;