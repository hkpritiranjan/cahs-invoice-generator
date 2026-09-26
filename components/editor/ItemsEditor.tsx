"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";
import { NumberInput } from "@/components/ui/NumberInput";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/invoice/formatting";

export function ItemsEditor() {
  const { state, itemCalculations, addItem, removeItem, updateItem, duplicateItem, reorderItem } =
    useInvoice();
  const { items } = state.invoice;
  const { appearance } = state;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-300 text-left text-xs font-medium text-neutral-500">
              <th className="w-8 py-1.5">#</th>
              <th className="min-w-[160px] py-1.5">Description</th>
              <th className="w-24 py-1.5">HSN/SAC</th>
              <th className="w-20 py-1.5">Qty</th>
              <th className="w-24 py-1.5">Rate</th>
              <th className="w-16 py-1.5">SGST %</th>
              <th className="w-16 py-1.5">CGST %</th>
              <th className="w-16 py-1.5">Cess %</th>
              <th className="w-28 py-1.5 text-right">Amount</th>
              <th className="w-32 py-1.5" />
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const calc = itemCalculations[item.id];
              return (
                <tr key={item.id} className="border-b border-neutral-100 align-top">
                  <td className="py-1.5 pr-1 text-neutral-400">{index + 1}</td>
                  <td className="py-1.5 pr-1">
                    <Input
                      aria-label={`Description for item ${index + 1}`}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <Input
                      aria-label={`HSN/SAC for item ${index + 1}`}
                      value={item.hsnSac}
                      onChange={(e) => updateItem(item.id, { hsnSac: e.target.value })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <NumberInput
                      aria-label={`Quantity for item ${index + 1}`}
                      value={item.quantity}
                      onChange={(quantity) => updateItem(item.id, { quantity })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <NumberInput
                      aria-label={`Rate for item ${index + 1}`}
                      value={item.rate}
                      onChange={(rate) => updateItem(item.id, { rate })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <NumberInput
                      aria-label={`SGST percent for item ${index + 1}`}
                      value={item.sgst}
                      onChange={(sgst) => updateItem(item.id, { sgst })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <NumberInput
                      aria-label={`CGST percent for item ${index + 1}`}
                      value={item.cgst}
                      onChange={(cgst) => updateItem(item.id, { cgst })}
                    />
                  </td>
                  <td className="py-1.5 pr-1">
                    <NumberInput
                      aria-label={`Cess percent for item ${index + 1}`}
                      value={item.cess}
                      onChange={(cess) => updateItem(item.id, { cess })}
                    />
                  </td>
                  <td className="py-1.5 pr-1 pt-3.5 text-right font-medium">
                    {formatCurrency(calc?.totalAmount ?? 0, appearance.currencySymbol)}
                  </td>
                  <td className="py-1.5 pt-2.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label={`Move item ${index + 1} up`}
                        disabled={index === 0}
                        onClick={() => reorderItem(item.id, "up")}
                        className="rounded px-1.5 py-1 text-neutral-500 hover:bg-neutral-100 disabled:opacity-30"
                      >
                        &uarr;
                      </button>
                      <button
                        type="button"
                        aria-label={`Move item ${index + 1} down`}
                        disabled={index === items.length - 1}
                        onClick={() => reorderItem(item.id, "down")}
                        className="rounded px-1.5 py-1 text-neutral-500 hover:bg-neutral-100 disabled:opacity-30"
                      >
                        &darr;
                      </button>
                      <button
                        type="button"
                        aria-label={`Duplicate item ${index + 1}`}
                        onClick={() => duplicateItem(item.id)}
                        className="rounded px-1.5 py-1 text-neutral-500 hover:bg-neutral-100"
                      >
                        &#10697;
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete item ${index + 1}`}
                        disabled={items.length === 1}
                        onClick={() => removeItem(item.id)}
                        className="rounded px-1.5 py-1 text-red-500 hover:bg-red-50 disabled:opacity-30"
                      >
                        &#10005;
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Button type="button" variant="secondary" onClick={addItem} className="self-start">
        + Add Item
      </Button>
    </div>
  );
}
