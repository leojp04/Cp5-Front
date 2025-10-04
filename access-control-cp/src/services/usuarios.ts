import { apiGet, apiPost } from "./api";

export type Usuario = {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

export async function findByCredentials(nomeUsuario: string, email: string) {
  const qs = new URLSearchParams({ nomeUsuario, email }).toString();
  const list = await apiGet<Usuario[]>(`/usuarios?${qs}`);
  return list[0] ?? null;
}

export async function existsDuplicate(nomeUsuario: string, email: string) {
  const [u, e] = await Promise.all([
    apiGet<Usuario[]>(`/usuarios?${new URLSearchParams({ nomeUsuario }).toString()}`),
    apiGet<Usuario[]>(`/usuarios?${new URLSearchParams({ email }).toString()}`),
  ]);
  return { nomeUsuario: u.length > 0, email: e.length > 0 };
}

export async function createUsuario(data: Omit<Usuario, "id">) {
  return apiPost<Usuario>("/usuarios", data);
}
