import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-cyan-300",
        variant === "secondary" && "border border-border bg-secondary text-secondary-foreground hover:bg-slate-800",
        variant === "ghost" && "text-slate-200 hover:bg-white/8",
        variant === "danger" && "bg-destructive text-destructive-foreground hover:bg-rose-400",
        className,
      )}
      {...props}
    />
  );
}
