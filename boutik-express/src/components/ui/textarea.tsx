'use client';

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, required, rows = 4, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-1">
        {label ? (
          <span className="text-sm font-medium text-slate-700">
            {label} {required ? <span className="text-red-500">*</span> : null}
          </span>
        ) : null}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className,
          )}
          rows={rows}
          required={required}
          {...props}
        />
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </label>
    );
  },
);

Textarea.displayName = "Textarea";

