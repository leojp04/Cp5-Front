const DEFAULT_API_URL = "http://localhost:3001";

const envApiUrl = typeof import.meta !== "undefined"
  ? (import.meta.env?.VITE_API_URL ?? "").toString().trim()
  : "";

export const API_URL = envApiUrl || DEFAULT_API_URL;

export const AUTH_STORAGE_KEY = "access-control:user";