'use client';

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, required, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-1">
        {label ? (
          <span className="text-sm font-medium text-slate-700">
            {label} {required ? <span className="text-red-500">*</span> : null}
          </span>
        ) : null}
        <input
          ref={ref}
          className={cn("input", error && "border-red-500 focus:border-red-500 focus:ring-red-100", className)}
          required={required}
          {...props}
        />
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </label>
    );
  },
);

Input.displayName = "Input";

