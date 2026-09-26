type InvoiceTitleProps = {
  title: string;
};

// A horizontal rule / centered title / horizontal rule composition, matching
// the reference invoice's "----- TAX INVOICE -----" header band.
export function InvoiceTitle({ title }: InvoiceTitleProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px bg-black" style={{ flex: 2 }} />
      <span className="whitespace-nowrap text-sm font-bold tracking-[0.15em]">{title}</span>
      <div className="h-px bg-black" style={{ flex: 1 }} />
    </div>
  );
}
