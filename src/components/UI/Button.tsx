import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-pinkscan-primary text-white hover:opacity-90 focus-visible:ring-pinkscan-primary",
    outline:
      "border border-pinkscan-primary text-pinkscan-primary hover:bg-pinkscan-primary/10 focus-visible:ring-pinkscan-primary",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
