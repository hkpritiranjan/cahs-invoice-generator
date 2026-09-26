import type { AppearanceSettings } from "@/types/invoice";
import { formatCurrency } from "@/lib/invoice/formatting";

type InvoiceTotalsProps = {
  appearance: AppearanceSettings;
  subtotal: number;
  totalSgst: number;
  totalCgst: number;
  totalCess: number;
  grandTotal: number;
};

export function InvoiceTotals({
  appearance,
  subtotal,
  totalSgst,
  totalCgst,
  totalCess,
  grandTotal,
}: InvoiceTotalsProps) {
  // Matches the reference invoice: the tax breakdown rows only appear when
  // there is actually tax to report, so an untaxed invoice shows just
  // Sub Total and TOTAL.
  const symbol = appearance.currencySymbol;
  const rows: [string, number][] = [
    ["Sub Total", subtotal],
    ...(appearance.showSgst && totalSgst > 0 ? ([["Total SGST", totalSgst]] as [string, number][]) : []),
    ...(appearance.showCgst && totalCgst > 0 ? ([["Total CGST", totalCgst]] as [string, number][]) : []),
    ...(appearance.showCess && totalCess > 0 ? ([["Total Cess", totalCess]] as [string, number][]) : []),
  ];

  return (
    <table className="ml-auto w-full max-w-[220px]" style={{ breakInside: "avoid" }}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td className="py-0.5 text-left">{label}</td>
            <td className="py-0.5 text-right">{formatCurrency(value, symbol)}</td>
          </tr>
        ))}
        <tr className="border-t-2 border-black font-bold">
          <td className="py-1.5 text-left">TOTAL</td>
          <td className="py-1.5 text-right">{formatCurrency(grandTotal, symbol)}</td>
        </tr>
      </tbody>
    </table>
  );
}
