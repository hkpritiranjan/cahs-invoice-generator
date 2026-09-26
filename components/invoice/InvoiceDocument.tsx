import type { AppState } from "@/types/invoice";
import { calculateInvoice } from "@/lib/invoice/calculations";
import { InvoiceHeader } from "./InvoiceHeader";
import { BillToSection } from "./BillToSection";
import { InvoiceMeta } from "./InvoiceMeta";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import { InvoiceTotals } from "./InvoiceTotals";
import { BankDetails } from "./BankDetails";
import { NatureOfBusiness } from "./NatureOfBusiness";

type InvoiceDocumentProps = {
  state: AppState;
};

// The printable A4 invoice canvas. Pure presentational: takes the full app
// state and renders it exactly as it will appear on paper / in the PDF.
export function InvoiceDocument({ state }: InvoiceDocumentProps) {
  const { seller, logo, bankDetails, appearance, invoice } = state;
  const totals = calculateInvoice(invoice.items);

  return (
    <div
      id="invoice-document"
      className="invoice-page bg-white text-black"
      style={{ fontFamily: appearance.primaryFont, fontSize: `${appearance.fontSize}px` }}
    >
      <InvoiceHeader seller={seller} logo={logo} appearance={appearance} />

      <div className="mt-4 grid grid-cols-2 gap-6">
        <BillToSection client={invoice.client} />
        <InvoiceMeta invoice={invoice} />
      </div>

      <div className="mt-4" style={{ fontSize: `${appearance.tableFontSize}px` }}>
        <InvoiceItemsTable items={invoice.items} appearance={appearance} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <BankDetails bankDetails={bankDetails} appearance={appearance} />
        <InvoiceTotals
          appearance={appearance}
          subtotal={totals.subtotal}
          totalSgst={totals.totalSgst}
          totalCgst={totals.totalCgst}
          totalCess={totals.totalCess}
          grandTotal={totals.grandTotal}
        />
      </div>

      <div className="mt-6">
        <NatureOfBusiness text={invoice.natureOfBusiness} />
      </div>
    </div>
  );
}
