"use client";

import { useState, type ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function Card({ title, children, defaultOpen = true }: CardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
        <span className="text-neutral-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none" }}>
          &#9660;
        </span>
      </button>
      {open && <div className="border-t border-neutral-100 px-4 py-4">{children}</div>}
    </section>
  );
}
