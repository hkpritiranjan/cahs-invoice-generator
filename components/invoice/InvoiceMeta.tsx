import type { Invoice } from "@/types/invoice";
import { formatDateDisplay } from "@/lib/invoice/formatting";

type InvoiceMetaProps = {
  invoice: Pick<Invoice, "invoiceNumber" | "invoiceDate" | "dueDate">;
};

export function InvoiceMeta({ invoice }: InvoiceMetaProps) {
  const rows: [string, string][] = [
    ["Invoice#", invoice.invoiceNumber],
    ["Invoice Date", formatDateDisplay(invoice.invoiceDate)],
    ["Due Date", formatDateDisplay(invoice.dueDate)],
  ];

  return (
    <div className="ml-auto w-fit max-w-[220px]">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-left">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <span className="whitespace-nowrap font-bold">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
