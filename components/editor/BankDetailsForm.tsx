"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";

export function BankDetailsForm() {
  const { state, updateBankDetails } = useInvoice();
  const { bankDetails } = state;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Input
        label="Account Holder Name"
        className="col-span-2"
        value={bankDetails.accountHolderName}
        onChange={(e) => updateBankDetails({ accountHolderName: e.target.value })}
      />
      <Input
        label="Bank Name"
        value={bankDetails.bankName}
        onChange={(e) => updateBankDetails({ bankName: e.target.value })}
      />
      <Input
        label="Branch"
        value={bankDetails.branch}
        onChange={(e) => updateBankDetails({ branch: e.target.value })}
      />
      <Input
        label="Account Number"
        value={bankDetails.accountNumber}
        onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
      />
      <Input
        label="IFSC Code"
        value={bankDetails.ifscCode}
        onChange={(e) => updateBankDetails({ ifscCode: e.target.value })}
      />
      <Input label="PAN" value={bankDetails.pan} onChange={(e) => updateBankDetails({ pan: e.target.value })} />
      <Input
        label="Contact"
        value={bankDetails.contact}
        onChange={(e) => updateBankDetails({ contact: e.target.value })}
      />
      <Input
        label="Email"
        className="col-span-2"
        type="email"
        value={bankDetails.email}
        onChange={(e) => updateBankDetails({ email: e.target.value })}
      />
    </div>
  );
}
