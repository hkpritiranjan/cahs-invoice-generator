import type { ClientDetails } from "@/types/invoice";

type BillToSectionProps = {
  client: ClientDetails;
};

export function BillToSection({ client }: BillToSectionProps) {
  return (
    <div>
      <p className="mb-1 font-bold">Bill To:</p>
      <div className="whitespace-pre-line leading-snug">
        {client.billingText || <span className="text-neutral-400">&mdash;</span>}
      </div>
      {client.gstin && <p className="mt-1">GSTIN {client.gstin}</p>}
      {client.placeOfSupply && (
        <p className="mt-3">Place of Supply: {client.placeOfSupply}</p>
      )}
    </div>
  );
}
