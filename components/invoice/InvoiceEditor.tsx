"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SellerForm } from "@/components/editor/SellerForm";
import { LogoUploader } from "@/components/editor/LogoUploader";
import { ClientForm } from "@/components/editor/ClientForm";
import { InvoiceDetailsForm } from "@/components/editor/InvoiceDetailsForm";
import { ItemsEditor } from "@/components/editor/ItemsEditor";
import { BankDetailsForm } from "@/components/editor/BankDetailsForm";
import { BusinessDetailsForm } from "@/components/editor/BusinessDetailsForm";

export function InvoiceEditor() {
  const { newInvoice, resetInvoice, resetEverything } = useInvoice();

  const handleNewInvoice = () => {
    if (window.confirm("Start a new invoice? Current client, items, and invoice number will be cleared.")) {
      newInvoice();
    }
  };

  const handleResetInvoice = () => {
    if (window.confirm("Reset the current invoice? Client and items will be cleared.")) {
      resetInvoice();
    }
  };

  const handleResetEverything = () => {
    if (
      window.confirm(
        "Reset everything to application defaults? This clears your seller profile, bank details, logo, and appearance settings. This cannot be undone."
      )
    ) {
      resetEverything();
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col gap-4">
      <div className="no-print flex flex-wrap gap-2 rounded-lg border border-neutral-200 bg-white p-3">
        <Button variant="primary" onClick={handlePrint}>
          Print / Save PDF
        </Button>
        <Button variant="secondary" onClick={handleNewInvoice}>
          New Invoice
        </Button>
        <Button variant="secondary" onClick={handleResetInvoice}>
          Reset Invoice
        </Button>
        <Button variant="danger" onClick={handleResetEverything} className="ml-auto">
          Reset Everything
        </Button>
      </div>

      <Card title="1. Business / Seller">
        <SellerForm />
      </Card>
      <Card title="2. Logo">
        <LogoUploader />
      </Card>
      <Card title="3. Client / Bill To">
        <ClientForm />
      </Card>
      <Card title="4. Invoice Details">
        <InvoiceDetailsForm />
      </Card>
      <Card title="5. Items">
        <ItemsEditor />
      </Card>
      <Card title="6. Bank Details">
        <BankDetailsForm />
      </Card>
      <Card title="7. Nature of Business & Appearance" defaultOpen={false}>
        <BusinessDetailsForm />
      </Card>
    </div>
  );
}
