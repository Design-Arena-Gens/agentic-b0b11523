'use client';

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, required, children, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-1">
        {label ? (
          <span className="text-sm font-medium text-slate-700">
            {label} {required ? <span className="text-red-500">*</span> : null}
          </span>
        ) : null}
        <select
          ref={ref}
          className={cn(
            "input appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className,
          )}
          required={required}
          {...props}
        >
          {children}
        </select>
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </label>
    );
  },
);

Select.displayName = "Select";

