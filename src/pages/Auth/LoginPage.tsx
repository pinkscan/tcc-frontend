import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import { api } from "../../service/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao entrar");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/app";
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-md border border-pinkscan-primary/20 p-6">
      <h1 className="text-2xl font-bold text-pinkscan-dark mb-1">Entrar</h1>
      <p className="text-sm text-pinkscan-dark/70 mb-6">
        Acesse a área operacional do Pink Scan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 text-sm">
          <label className="font-medium">E-mail corporativo</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-pinkscan-primary/30 focus:outline-none focus:ring-2 focus:ring-pinkscan-primary/60"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="font-medium">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-pinkscan-primary/30 focus:outline-none focus:ring-2 focus:ring-pinkscan-primary/60"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-4 py-2.5 rounded-full bg-pinkscan-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-xs text-pinkscan-dark/70 mt-4">
        Ainda não tem acesso?{" "}
        <Link to="/register" className="text-pinkscan-primary hover:underline">
          Solicitar cadastro
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
