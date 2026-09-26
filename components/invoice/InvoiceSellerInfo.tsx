import type { SellerProfile } from "@/types/invoice";

type InvoiceSellerInfoProps = {
  seller: SellerProfile;
};

// Matches the reference invoice's header block: business name, seller name,
// and address only. PAN/contact/email appear in the Bank Details block
// instead, not duplicated here.
export function InvoiceSellerInfo({ seller }: InvoiceSellerInfoProps) {
  return (
    <div className="text-right leading-snug">
      <p className="text-base font-bold">{seller.businessName}</p>
      <p className="font-medium">{seller.sellerName}</p>
      {seller.address.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
