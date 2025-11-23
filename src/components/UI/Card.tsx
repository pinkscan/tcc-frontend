import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white/90 rounded-2xl border border-pinkscan-primary/20 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
