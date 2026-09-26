"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function InvoiceDetailsForm() {
  const { state, updateInvoiceDetails, updateAppearance, generateNewInvoiceNumber } = useInvoice();
  const { invoice, appearance } = state;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input
          label="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={(e) => updateInvoiceDetails({ invoiceNumber: e.target.value })}
        />
        <div className="mt-2 flex items-center gap-2">
          <Input
            aria-label="Invoice number prefix"
            className="w-32"
            value={appearance.invoiceNumberPrefix}
            onChange={(e) => updateAppearance({ invoiceNumberPrefix: e.target.value })}
          />
          <Button type="button" variant="secondary" onClick={generateNewInvoiceNumber}>
            Generate Invoice Number
          </Button>
        </div>
      </div>
      <Input
        label="Invoice Date"
        type="date"
        value={invoice.invoiceDate}
        onChange={(e) => updateInvoiceDetails({ invoiceDate: e.target.value })}
      />
      <Input
        label="Due Date"
        type="date"
        value={invoice.dueDate}
        onChange={(e) => updateInvoiceDetails({ dueDate: e.target.value })}
      />
    </div>
  );
}
