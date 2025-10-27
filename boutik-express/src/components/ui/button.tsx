'use client';

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      loading = false,
      children,
      asChild = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      variant === "outline"
        ? "btn-outline"
        : variant === "ghost"
          ? "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          : "btn-primary";

    const Component: any = asChild ? Slot : "button";

    const mergedDisabled = loading || disabled;

    const componentProps = asChild
      ? { ...props, "aria-disabled": mergedDisabled }
      : { ...props, disabled: mergedDisabled };

    return (
      <Component
        ref={ref}
        className={cn(base, mergedDisabled && "cursor-not-allowed opacity-70", className)}
        {...componentProps}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";
