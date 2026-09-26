// Core domain model for the invoice generator. Kept independent of any UI framework.

export type SellerProfile = {
  businessName: string;
  sellerName: string;
  address: string[];
  gstin?: string;
  pan?: string;
  phone?: string;
  email?: string;
  logo?: string;
};

export type ClientDetails = {
  billingText: string;
  gstin?: string;
  placeOfSupply?: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  sgst: number;
  cgst: number;
  cess: number;
};

export type BankDetails = {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  pan: string;
  contact: string;
  email: string;
};

export type LogoConfig = {
  dataUrl?: string;
  width: number;
  height: number;
};

export type AppearanceSettings = {
  invoiceTitle: string;
  primaryFont: string;
  fontSize: number;
  tableFontSize: number;
  currency: string;
  currencySymbol: string;
  showHsnSac: boolean;
  showSgst: boolean;
  showCgst: boolean;
  showCess: boolean;
  showPan: boolean;
  showContact: boolean;
  showEmail: boolean;
  invoiceNumberPrefix: string;
};

export type Invoice = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  client: ClientDetails;
  items: InvoiceItem[];

  natureOfBusiness: string;
};

// Everything persisted to localStorage: the reusable seller/bank/appearance
// profile plus the current in-progress invoice.
export type AppState = {
  seller: SellerProfile;
  logo: LogoConfig;
  bankDetails: BankDetails;
  appearance: AppearanceSettings;
  invoice: Invoice;
};

export type ItemCalculation = {
  baseAmount: number;
  sgstAmount: number;
  cgstAmount: number;
  cessAmount: number;
  totalTax: number;
  totalAmount: number;
};

export type InvoiceCalculation = {
  subtotal: number;
  totalSgst: number;
  totalCgst: number;
  totalCess: number;
  totalTax: number;
  grandTotal: number;
};
