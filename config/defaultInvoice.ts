import type { AppState, InvoiceItem } from "@/types/invoice";
import { addDaysIso, todayIso } from "@/lib/invoice/formatting";
import { generateInvoiceNumber } from "@/lib/invoice/invoice-number";

export const STORAGE_KEY = "cahs-invoice-generator:v1";

export function createEmptyItem(): InvoiceItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    hsnSac: "",
    quantity: 0,
    rate: 0,
    sgst: 0,
    cgst: 0,
    cess: 0,
  };
}

export function createDefaultAppState(): AppState {
  const invoiceDate = todayIso();
  const dueDate = addDaysIso(invoiceDate, 15);
  const invoicePrefix = "INV";

  return {
    seller: {
      businessName: "Your Business Name",
      sellerName: "Your Name",
      address: ["Address Line 1", "City", "State", "Country"],
      gstin: "",
      pan: "",
      phone: "",
      email: "",
    },
    logo: {
      dataUrl: undefined,
      width: 96,
      height: 96,
    },
    bankDetails: {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branch: "",
      pan: "",
      contact: "",
      email: "",
    },
    appearance: {
      invoiceTitle: "TAX INVOICE",
      primaryFont: "Arial, Helvetica, sans-serif",
      fontSize: 12,
      tableFontSize: 11,
      currency: "INR",
      currencySymbol: "₹",
      showHsnSac: true,
      showSgst: true,
      showCgst: true,
      showCess: true,
      showPan: true,
      showContact: true,
      showEmail: true,
      invoiceNumberPrefix: invoicePrefix,
    },
    invoice: {
      invoiceNumber: generateInvoiceNumber(invoicePrefix, invoiceDate),
      invoiceDate,
      dueDate,
      client: {
        billingText: "",
        gstin: "",
        placeOfSupply: "Karnataka",
      },
      items: [createEmptyItem()],
      natureOfBusiness:
        "Payment to advertising agency to carry out the work of advertisement",
    },
  };
}
