"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function ClientForm() {
  const { state, updateClient } = useInvoice();
  const { client } = state.invoice;

  return (
    <div className="flex flex-col gap-3">
      <Textarea
        label="Bill To"
        rows={6}
        value={client.billingText}
        onChange={(e) => updateClient({ billingText: e.target.value })}
        placeholder={"Paste client billing details, e.g.\nACME PRIVATE LIMITED\n123 Business Park\nIndore\nMadhya Pradesh\nIndia"}
        hint="Paste the client's full billing address. Line breaks are preserved exactly as entered."
      />
      <Input
        label="Client GSTIN (optional)"
        value={client.gstin ?? ""}
        onChange={(e) => updateClient({ gstin: e.target.value })}
      />
      <Input
        label="Place of Supply"
        value={client.placeOfSupply ?? ""}
        onChange={(e) => updateClient({ placeOfSupply: e.target.value })}
      />
    </div>
  );
}
