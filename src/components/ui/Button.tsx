import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "gold",
  size = "md",
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    gold: "bg-gold-gradient text-obsidian-700 hover:shadow-gold-md hover:-translate-y-0.5",
    outline:
      "border border-gold-DEFAULT/60 text-gold-DEFAULT hover:bg-gold-DEFAULT/10 hover:border-gold-DEFAULT",
    ghost:
      "text-muted hover:text-cream hover:bg-white/5",
  };

  const sizes = {
    sm: "text-[0.6rem] px-4 py-2.5",
    md: "text-[0.7rem] px-6 py-3.5",
    lg: "text-[0.75rem] px-8 py-4",
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
