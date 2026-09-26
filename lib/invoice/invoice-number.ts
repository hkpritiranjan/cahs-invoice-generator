// Generates invoice numbers as PREFIX-DDMMYYYY, e.g. CAHS-INV-26092026.
export function generateInvoiceNumber(prefix: string, isoDate: string): string {
  const date = isoDate ? new Date(`${isoDate}T00:00:00`) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  const day = String(safeDate.getDate()).padStart(2, "0");
  const month = String(safeDate.getMonth() + 1).padStart(2, "0");
  const year = safeDate.getFullYear();

  const cleanPrefix = prefix.trim().replace(/-+$/, "");
  return `${cleanPrefix}-${day}${month}${year}`;
}
