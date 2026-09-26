"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function SellerForm() {
  const { state, updateSeller } = useInvoice();
  const { seller } = state;

  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Business Name"
        value={seller.businessName}
        onChange={(e) => updateSeller({ businessName: e.target.value })}
      />
      <Input
        label="Seller Name"
        value={seller.sellerName}
        onChange={(e) => updateSeller({ sellerName: e.target.value })}
      />
      <Textarea
        label="Address"
        rows={4}
        value={seller.address.join("\n")}
        onChange={(e) => updateSeller({ address: e.target.value.split("\n") })}
        hint="One line per row, as it should appear on the invoice."
      />
      <div className="grid grid-cols-2 gap-3">
        <Input label="PAN" value={seller.pan ?? ""} onChange={(e) => updateSeller({ pan: e.target.value })} />
        <Input label="GSTIN" value={seller.gstin ?? ""} onChange={(e) => updateSeller({ gstin: e.target.value })} />
        <Input label="Phone" value={seller.phone ?? ""} onChange={(e) => updateSeller({ phone: e.target.value })} />
        <Input
          label="Email"
          type="email"
          value={seller.email ?? ""}
          onChange={(e) => updateSeller({ email: e.target.value })}
        />
      </div>
      <p className="text-xs text-neutral-400">
        Saved automatically and reused as the default for every new invoice.
      </p>
    </div>
  );
}
