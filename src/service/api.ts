import { API_URL } from "../config";

export async function api(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  ...(options.headers as Record<string, string>),
};

if (token) headers["Authorization"] = `Bearer ${token}`;

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
