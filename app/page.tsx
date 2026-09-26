import { InvoiceEditor } from "@/components/invoice/InvoiceEditor";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";

export default function Home() {
  return (
    <div className="app-shell mx-auto flex w-full max-w-[1400px] flex-col gap-4 p-4 lg:p-6">
      <header className="no-print">
        <h1 className="text-lg font-semibold text-neutral-900">Invoice Generator</h1>
        <p className="text-sm text-neutral-500">Configure your business profile in the editor below</p>
      </header>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,480px)_1fr]">
        <div className="no-print order-1">
          <InvoiceEditor />
        </div>
        <div className="order-2 lg:sticky lg:top-4 lg:h-fit">
          <InvoicePreview />
        </div>
      </main>
    </div>
  );
}
