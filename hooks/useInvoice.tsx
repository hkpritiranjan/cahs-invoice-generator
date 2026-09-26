"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type {
  AppState,
  AppearanceSettings,
  BankDetails,
  ClientDetails,
  Invoice,
  InvoiceItem,
  LogoConfig,
  SellerProfile,
} from "@/types/invoice";
import { calculateInvoice, calculateItem } from "@/lib/invoice/calculations";
import { createDefaultAppState, createEmptyItem, STORAGE_KEY } from "@/config/defaultInvoice";
import { generateInvoiceNumber } from "@/lib/invoice/invoice-number";
import { addDaysIso, todayIso } from "@/lib/invoice/formatting";
import { useLocalStorage } from "./useLocalStorage";

type InvoiceContextValue = {
  state: AppState;
  hydrated: boolean;

  updateSeller: (patch: Partial<SellerProfile>) => void;
  updateLogo: (patch: Partial<LogoConfig>) => void;
  updateClient: (patch: Partial<ClientDetails>) => void;
  updateInvoiceDetails: (patch: Partial<Pick<Invoice, "invoiceNumber" | "invoiceDate" | "dueDate">>) => void;
  generateNewInvoiceNumber: () => void;

  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, patch: Partial<InvoiceItem>) => void;
  duplicateItem: (id: string) => void;
  reorderItem: (id: string, direction: "up" | "down") => void;

  updateBankDetails: (patch: Partial<BankDetails>) => void;
  updateNatureOfBusiness: (text: string) => void;
  updateAppearance: (patch: Partial<AppearanceSettings>) => void;

  newInvoice: () => void;
  resetInvoice: () => void;
  resetEverything: () => void;

  itemCalculations: Record<string, ReturnType<typeof calculateItem>>;
  subtotal: number;
  totalSgst: number;
  totalCgst: number;
  totalCess: number;
  totalTax: number;
  grandTotal: number;
};

const InvoiceContext = createContext<InvoiceContextValue | null>(null);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [state, setState, hydrated] = useLocalStorage<AppState>(
    STORAGE_KEY,
    createDefaultAppState()
  );

  const updateSeller = useCallback(
    (patch: Partial<SellerProfile>) => {
      setState((prev) => ({ ...prev, seller: { ...prev.seller, ...patch } }));
    },
    [setState]
  );

  const updateLogo = useCallback(
    (patch: Partial<LogoConfig>) => {
      setState((prev) => ({ ...prev, logo: { ...prev.logo, ...patch } }));
    },
    [setState]
  );

  const updateClient = useCallback(
    (patch: Partial<ClientDetails>) => {
      setState((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, client: { ...prev.invoice.client, ...patch } },
      }));
    },
    [setState]
  );

  const updateInvoiceDetails = useCallback(
    (patch: Partial<Pick<Invoice, "invoiceNumber" | "invoiceDate" | "dueDate">>) => {
      setState((prev) => ({ ...prev, invoice: { ...prev.invoice, ...patch } }));
    },
    [setState]
  );

  const generateNewInvoiceNumber = useCallback(() => {
    setState((prev) => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        invoiceNumber: generateInvoiceNumber(
          prev.appearance.invoiceNumberPrefix,
          prev.invoice.invoiceDate
        ),
      },
    }));
  }, [setState]);

  const addItem = useCallback(() => {
    setState((prev) => ({
      ...prev,
      invoice: { ...prev.invoice, items: [...prev.invoice.items, createEmptyItem()] },
    }));
  }, [setState]);

  const removeItem = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          items:
            prev.invoice.items.length > 1
              ? prev.invoice.items.filter((item) => item.id !== id)
              : prev.invoice.items,
        },
      }));
    },
    [setState]
  );

  const updateItem = useCallback(
    (id: string, patch: Partial<InvoiceItem>) => {
      setState((prev) => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          items: prev.invoice.items.map((item) =>
            item.id === id ? { ...item, ...patch } : item
          ),
        },
      }));
    },
    [setState]
  );

  const duplicateItem = useCallback(
    (id: string) => {
      setState((prev) => {
        const index = prev.invoice.items.findIndex((item) => item.id === id);
        if (index === -1) return prev;
        const copy: InvoiceItem = { ...prev.invoice.items[index], id: crypto.randomUUID() };
        const items = [...prev.invoice.items];
        items.splice(index + 1, 0, copy);
        return { ...prev, invoice: { ...prev.invoice, items } };
      });
    },
    [setState]
  );

  const reorderItem = useCallback(
    (id: string, direction: "up" | "down") => {
      setState((prev) => {
        const index = prev.invoice.items.findIndex((item) => item.id === id);
        if (index === -1) return prev;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= prev.invoice.items.length) return prev;
        const items = [...prev.invoice.items];
        [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
        return { ...prev, invoice: { ...prev.invoice, items } };
      });
    },
    [setState]
  );

  const updateBankDetails = useCallback(
    (patch: Partial<BankDetails>) => {
      setState((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, ...patch } }));
    },
    [setState]
  );

  const updateNatureOfBusiness = useCallback(
    (text: string) => {
      setState((prev) => ({ ...prev, invoice: { ...prev.invoice, natureOfBusiness: text } }));
    },
    [setState]
  );

  const updateAppearance = useCallback(
    (patch: Partial<AppearanceSettings>) => {
      setState((prev) => ({ ...prev, appearance: { ...prev.appearance, ...patch } }));
    },
    [setState]
  );

  const newInvoice = useCallback(() => {
    setState((prev) => {
      const invoiceDate = todayIso();
      return {
        ...prev,
        invoice: {
          invoiceNumber: generateInvoiceNumber(prev.appearance.invoiceNumberPrefix, invoiceDate),
          invoiceDate,
          dueDate: addDaysIso(invoiceDate, 15),
          client: { billingText: "", gstin: "", placeOfSupply: "Karnataka" },
          items: [createEmptyItem()],
          natureOfBusiness: prev.invoice.natureOfBusiness,
        },
      };
    });
  }, [setState]);

  const resetInvoice = useCallback(() => {
    newInvoice();
  }, [newInvoice]);

  const resetEverything = useCallback(() => {
    setState(createDefaultAppState());
  }, [setState]);

  const itemCalculations = useMemo(() => {
    const map: Record<string, ReturnType<typeof calculateItem>> = {};
    for (const item of state.invoice.items) {
      map[item.id] = calculateItem(item);
    }
    return map;
  }, [state.invoice.items]);

  const totals = useMemo(() => calculateInvoice(state.invoice.items), [state.invoice.items]);

  const value: InvoiceContextValue = {
    state,
    hydrated,
    updateSeller,
    updateLogo,
    updateClient,
    updateInvoiceDetails,
    generateNewInvoiceNumber,
    addItem,
    removeItem,
    updateItem,
    duplicateItem,
    reorderItem,
    updateBankDetails,
    updateNatureOfBusiness,
    updateAppearance,
    newInvoice,
    resetInvoice,
    resetEverything,
    itemCalculations,
    subtotal: totals.subtotal,
    totalSgst: totals.totalSgst,
    totalCgst: totals.totalCgst,
    totalCess: totals.totalCess,
    totalTax: totals.totalTax,
    grandTotal: totals.grandTotal,
  };

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
}

export function useInvoice(): InvoiceContextValue {
  const ctx = useContext(InvoiceContext);
  if (!ctx) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return ctx;
}
