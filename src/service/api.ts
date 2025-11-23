const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function api(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
