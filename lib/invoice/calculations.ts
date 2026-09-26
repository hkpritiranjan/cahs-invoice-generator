import type { InvoiceItem, ItemCalculation, InvoiceCalculation } from "@/types/invoice";

// All money math happens in integer paise (1/100 rupee) to avoid floating
// point drift, then is converted back to rupees (as a number) at the edges.
const toPaise = (rupees: number): number => Math.round(rupees * 100);
const toRupees = (paise: number): number => paise / 100;

const safeNumber = (value: number): number => {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    return 0;
  }
  return value;
};

export function calculateItem(item: InvoiceItem): ItemCalculation {
  const quantity = Math.max(0, safeNumber(item.quantity));
  const rate = Math.max(0, safeNumber(item.rate));
  const sgstPct = Math.max(0, safeNumber(item.sgst));
  const cgstPct = Math.max(0, safeNumber(item.cgst));
  const cessPct = Math.max(0, safeNumber(item.cess));

  const basePaise = toPaise(quantity * rate);
  const sgstAmountPaise = Math.round((basePaise * sgstPct) / 100);
  const cgstAmountPaise = Math.round((basePaise * cgstPct) / 100);
  const cessAmountPaise = Math.round((basePaise * cessPct) / 100);
  const totalTaxPaise = sgstAmountPaise + cgstAmountPaise + cessAmountPaise;
  const totalAmountPaise = basePaise + totalTaxPaise;

  return {
    baseAmount: toRupees(basePaise),
    sgstAmount: toRupees(sgstAmountPaise),
    cgstAmount: toRupees(cgstAmountPaise),
    cessAmount: toRupees(cessAmountPaise),
    totalTax: toRupees(totalTaxPaise),
    totalAmount: toRupees(totalAmountPaise),
  };
}

export function calculateInvoice(items: InvoiceItem[]): InvoiceCalculation {
  let subtotalPaise = 0;
  let totalSgstPaise = 0;
  let totalCgstPaise = 0;
  let totalCessPaise = 0;

  for (const item of items) {
    const calc = calculateItem(item);
    subtotalPaise += toPaise(calc.baseAmount);
    totalSgstPaise += toPaise(calc.sgstAmount);
    totalCgstPaise += toPaise(calc.cgstAmount);
    totalCessPaise += toPaise(calc.cessAmount);
  }

  const totalTaxPaise = totalSgstPaise + totalCgstPaise + totalCessPaise;
  const grandTotalPaise = subtotalPaise + totalTaxPaise;

  return {
    subtotal: toRupees(subtotalPaise),
    totalSgst: toRupees(totalSgstPaise),
    totalCgst: toRupees(totalCgstPaise),
    totalCess: toRupees(totalCessPaise),
    totalTax: toRupees(totalTaxPaise),
    grandTotal: toRupees(grandTotalPaise),
  };
}
