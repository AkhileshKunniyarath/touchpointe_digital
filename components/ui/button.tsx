import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    default:
      "bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25 hover:opacity-95",
    secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-slate-200 hover:bg-white/5"
  },
  size: {
    default: "h-11 px-5 py-2.5",
    lg: "h-12 px-6 py-3",
    sm: "h-9 px-4 text-sm"
  }
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:pointer-events-none disabled:opacity-60",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };

