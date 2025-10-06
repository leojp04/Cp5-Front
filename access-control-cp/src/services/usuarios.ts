import { apiGet, apiPost } from "./api";

export type Usuario = {
  id?: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

export async function listarUsuarios() {
  return apiGet<Usuario[]>("/usuarios");
}

export async function findByCredentials(nomeUsuario: string, email: string) {
  const q = `/usuarios?nomeUsuario=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(email)}`;
  const data = await apiGet<Usuario[]>(q);
  return data[0] ?? null;
}

export async function criarUsuario(user: Usuario) {
  return apiPost<Usuario>("/usuarios", user);
}
