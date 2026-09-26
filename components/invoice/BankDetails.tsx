import type { AppearanceSettings, BankDetails as BankDetailsType } from "@/types/invoice";

type BankDetailsProps = {
  bankDetails: BankDetailsType;
  appearance: AppearanceSettings;
};

export function BankDetails({ bankDetails, appearance }: BankDetailsProps) {
  return (
    <div style={{ breakInside: "avoid" }}>
      <p>Account Holder Name - {bankDetails.accountHolderName}</p>
      <p>Bank Name - {bankDetails.bankName}</p>
      <p>Account Number - {bankDetails.accountNumber}</p>
      <p>IFSC Code - {bankDetails.ifscCode}</p>
      <p>Branch - {bankDetails.branch}</p>
      {(appearance.showPan || appearance.showContact || appearance.showEmail) && <div className="h-3" />}
      {appearance.showPan && bankDetails.pan && <p>PAN - {bankDetails.pan}</p>}
      {appearance.showContact && bankDetails.contact && <p>Contact - {bankDetails.contact}</p>}
      {appearance.showEmail && bankDetails.email && <p>Email - {bankDetails.email}</p>}
    </div>
  );
}
