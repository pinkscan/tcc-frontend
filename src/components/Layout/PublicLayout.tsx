// src/components/Layout/PublicLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../Logo";

const PublicLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-pinkscan-light text-pinkscan-dark">
      <header className="border-b border-pinkscan-primary/20 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="/">
            <Logo />
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/#como-funciona" className="hover:underline">
              Como funciona
            </a>
            <a href="/#para-hospitais" className="hover:underline">
              Para hospitais
            </a>
            <Link
              to="/login"
              className={`px-3 py-1 rounded-full border text-sm ${
                pathname === "/login"
                  ? "bg-pinkscan-primary text-white border-pinkscan-primary"
                  : "border-pinkscan-primary text-pinkscan-primary hover:bg-pinkscan-primary hover:text-white"
              }`}
            >
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-pinkscan-primary/20 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-pinkscan-dark/70 flex justify-between">
          <span>© {new Date().getFullYear()} Pink Scan. Todos os direitos reservados.</span>
          <span>O câncer não espera. Nós também não.</span>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
