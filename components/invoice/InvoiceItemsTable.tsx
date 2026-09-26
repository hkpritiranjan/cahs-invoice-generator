import type { AppearanceSettings, InvoiceItem } from "@/types/invoice";
import { calculateItem } from "@/lib/invoice/calculations";
import { formatCurrency, formatNumber } from "@/lib/invoice/formatting";

type InvoiceItemsTableProps = {
  items: InvoiceItem[];
  appearance: AppearanceSettings;
};

export function InvoiceItemsTable({ items, appearance }: InvoiceItemsTableProps) {
  const visibleItems = items.filter(
    (item) => item.description.trim() || item.quantity > 0 || item.rate > 0
  );

  return (
    <table className="w-full border-collapse text-left" style={{ pageBreakInside: "auto" }}>
      <thead>
        <tr className="border-y-2 border-black font-bold">
          <th className="w-8 py-1.5 pr-1 text-left">#</th>
          <th className="py-1.5 pr-2 text-left">Item Description</th>
          {appearance.showHsnSac && <th className="py-1.5 pr-2 text-left">HSN/SAC</th>}
          <th className="py-1.5 pr-2 text-right">Qty</th>
          <th className="py-1.5 pr-2 text-right">Rate</th>
          {appearance.showSgst && <th className="py-1.5 pr-2 text-right">SGST</th>}
          {appearance.showCgst && <th className="py-1.5 pr-2 text-right">CGST</th>}
          {appearance.showCess && <th className="py-1.5 pr-2 text-right">Cess</th>}
          <th className="py-1.5 pl-2 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {visibleItems.length === 0 ? (
          <tr>
            <td colSpan={9} className="py-6 text-center text-neutral-400">
              No items added
            </td>
          </tr>
        ) : (
          visibleItems.map((item, index) => {
            const calc = calculateItem(item);
            return (
              <tr key={item.id} className="border-b border-neutral-300 align-top" style={{ breakInside: "avoid" }}>
                <td className="py-1.5 pr-1">{index + 1}</td>
                <td className="py-1.5 pr-2">{item.description}</td>
                {appearance.showHsnSac && <td className="py-1.5 pr-2">{item.hsnSac}</td>}
                <td className="py-1.5 pr-2 text-right">{formatNumber(item.quantity)}</td>
                <td className="py-1.5 pr-2 text-right">{formatNumber(item.rate)}</td>
                {appearance.showSgst && (
                  <td className="py-1.5 pr-2 text-right">
                    <div>{formatNumber(calc.sgstAmount)}</div>
                    <div className="text-neutral-500">{item.sgst}</div>
                  </td>
                )}
                {appearance.showCgst && (
                  <td className="py-1.5 pr-2 text-right">
                    <div>{formatNumber(calc.cgstAmount)}</div>
                    <div className="text-neutral-500">{item.cgst}</div>
                  </td>
                )}
                {appearance.showCess && (
                  <td className="py-1.5 pr-2 text-right">
                    <div>{formatNumber(calc.cessAmount)}</div>
                    <div className="text-neutral-500">{item.cess}</div>
                  </td>
                )}
                <td className="py-1.5 pl-2 text-right font-medium">
                  {formatCurrency(calc.totalAmount, appearance.currencySymbol)}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
