"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

// A numeric input that lets the user freely type (including a transient
// empty string or trailing decimal point) while always committing a safe,
// non-negative number to `onChange`.
export function NumberInput({ label, value, onChange, min = 0, id, className = "", ...props }: NumberInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [text, setText] = useState(String(value));
  // Re-sync the displayed text when `value` changes from outside (e.g. after
  // blur-commit elsewhere), without clobbering in-progress typing. Adjusting
  // state during render (React's documented pattern for this) instead of in
  // an effect avoids an extra render pass.
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    setText(String(value));
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-neutral-600">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        inputMode="decimal"
        className={`w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-right text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 ${className}`}
        value={text}
        onChange={(e) => {
          const raw = e.target.value;
          if (!/^\d*\.?\d*$/.test(raw)) return;
          setText(raw);
          const parsed = Number.parseFloat(raw);
          onChange(Number.isNaN(parsed) ? 0 : Math.max(min, parsed));
        }}
        onBlur={() => {
          const parsed = Number.parseFloat(text);
          const safe = Number.isNaN(parsed) ? 0 : Math.max(min, parsed);
          setText(String(safe));
          onChange(safe);
        }}
        {...props}
      />
    </div>
  );
}
