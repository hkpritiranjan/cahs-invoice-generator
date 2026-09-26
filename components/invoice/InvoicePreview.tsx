"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { InvoiceDocument } from "./InvoiceDocument";

export function InvoicePreview() {
  const { state } = useInvoice();

  return (
    <div className="invoice-preview-wrapper overflow-auto rounded-lg bg-neutral-100 p-4 lg:p-8">
      <div className="invoice-preview-inner mx-auto w-fit">
        <InvoiceDocument state={state} />
      </div>
    </div>
  );
}
