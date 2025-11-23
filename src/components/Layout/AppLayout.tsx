import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../Logo";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-pinkscan-light flex">
      <aside className="w-64 bg-white border-r border-pinkscan-primary/20 flex flex-col">
        <div className="p-4 border-b border-pinkscan-primary/20">
          <Logo />
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <Link
            to="/app"
            className={`block px-3 py-2 rounded-lg ${
              pathname === "/app"
                ? "bg-pinkscan-primary text-white"
                : "hover:bg-pinkscan-primary/10 text-pinkscan-dark"
            }`}
          >
            Nova análise
          </Link>
          <button className="block w-full text-left px-3 py-2 rounded-lg hover:bg-pinkscan-primary/10 text-pinkscan-dark/80">
            Histórico de exames (em breve)
          </button>
          <button className="block w-full text-left px-3 py-2 rounded-lg hover:bg-pinkscan-primary/10 text-pinkscan-dark/80">
            Perfil do hospital (em breve)
          </button>
        </nav>
        <div className="p-4 border-t border-pinkscan-primary/20 text-xs text-pinkscan-dark/70">
          <button className="hover:underline">Sair</button>
        </div>
      </aside>

      <main className="flex-1 p-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
