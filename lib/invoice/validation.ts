import type { Invoice } from "@/types/invoice";

export type ValidationErrors = {
  invoiceNumber?: string;
  invoiceDate?: string;
  items?: Record<string, string>;
};

export function validateInvoice(invoice: Invoice): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!invoice.invoiceNumber.trim()) {
    errors.invoiceNumber = "Invoice number is required";
  }

  if (!invoice.invoiceDate.trim()) {
    errors.invoiceDate = "Invoice date is required";
  }

  const itemErrors: Record<string, string> = {};
  for (const item of invoice.items) {
    if (item.quantity < 0) itemErrors[item.id] = "Quantity must be >= 0";
    else if (item.rate < 0) itemErrors[item.id] = "Rate must be >= 0";
    else if (item.sgst < 0) itemErrors[item.id] = "SGST must be >= 0";
    else if (item.cgst < 0) itemErrors[item.id] = "CGST must be >= 0";
    else if (item.cess < 0) itemErrors[item.id] = "Cess must be >= 0";
  }
  if (Object.keys(itemErrors).length > 0) {
    errors.items = itemErrors;
  }

  return errors;
}

// Clamps a raw numeric input (e.g. from a text field) to a safe, non-negative
// finite number. Used at every numeric input boundary in the editor.
export function sanitizeNonNegativeNumber(value: number): number {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, value);
}
