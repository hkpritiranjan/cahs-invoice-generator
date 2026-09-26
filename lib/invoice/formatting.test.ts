import { describe, expect, it } from "vitest";
import { formatCurrency } from "./formatting";
import { generateInvoiceNumber } from "./invoice-number";

describe("formatCurrency", () => {
  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("₹0.00");
  });

  it("formats 6000", () => {
    expect(formatCurrency(6000)).toBe("₹6,000.00");
  });

  it("formats 30000", () => {
    expect(formatCurrency(30000)).toBe("₹30,000.00");
  });
});

describe("generateInvoiceNumber", () => {
  it("builds PREFIX-DDMMYYYY", () => {
    expect(generateInvoiceNumber("CAHS-INV", "2026-09-26")).toBe("CAHS-INV-26092026");
  });
});
