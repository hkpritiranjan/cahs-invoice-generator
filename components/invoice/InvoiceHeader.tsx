import type { AppearanceSettings, LogoConfig, SellerProfile } from "@/types/invoice";
import { InvoiceLogo } from "./InvoiceLogo";
import { InvoiceSellerInfo } from "./InvoiceSellerInfo";
import { InvoiceTitle } from "./InvoiceTitle";

type InvoiceHeaderProps = {
  seller: SellerProfile;
  logo: LogoConfig;
  appearance: AppearanceSettings;
};

export function InvoiceHeader({ seller, logo, appearance }: InvoiceHeaderProps) {
  return (
    <header>
      <div className="flex items-start justify-between gap-6">
        <InvoiceLogo logo={logo} shortName="CAHS" />
        <InvoiceSellerInfo seller={seller} />
      </div>
      <InvoiceTitle title={appearance.invoiceTitle} />
    </header>
  );
}
