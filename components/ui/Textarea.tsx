"use client";

import { useId, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ label, hint, id, className = "", ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-medium text-neutral-600">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-neutral-400">{hint}</span>}
    </div>
  );
}
