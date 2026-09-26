import { describe, expect, it } from "vitest";
import { calculateInvoice, calculateItem } from "./calculations";
import type { InvoiceItem } from "@/types/invoice";

function makeItem(overrides: Partial<InvoiceItem> = {}): InvoiceItem {
  return {
    id: "1",
    description: "",
    hsnSac: "",
    quantity: 0,
    rate: 0,
    sgst: 0,
    cgst: 0,
    cess: 0,
    ...overrides,
  };
}

describe("calculateInvoice - empty invoice", () => {
  it("returns all zeros", () => {
    const result = calculateInvoice([]);
    expect(result).toEqual({
      subtotal: 0,
      totalSgst: 0,
      totalCgst: 0,
      totalCess: 0,
      totalTax: 0,
      grandTotal: 0,
    });
  });
});

describe("calculateItem - one item, no tax", () => {
  it("qty 1, rate 6000 => 6000", () => {
    const calc = calculateItem(makeItem({ quantity: 1, rate: 6000 }));
    expect(calc.baseAmount).toBe(6000);
    expect(calc.totalAmount).toBe(6000);
  });
});

describe("calculateInvoice - multiple items", () => {
  it("sums four items of 6000 each to 24000", () => {
    const items = [
      makeItem({ id: "1", quantity: 1, rate: 6000 }),
      makeItem({ id: "2", quantity: 1, rate: 6000 }),
      makeItem({ id: "3", quantity: 1, rate: 6000 }),
      makeItem({ id: "4", quantity: 1, rate: 6000 }),
    ];
    const result = calculateInvoice(items);
    expect(result.subtotal).toBe(24000);
    expect(result.grandTotal).toBe(24000);
  });

  it("sums five items to 30000", () => {
    const items = Array.from({ length: 5 }, (_, i) =>
      makeItem({ id: String(i), quantity: 1, rate: 6000 })
    );
    const result = calculateInvoice(items);
    expect(result.subtotal).toBe(30000);
    expect(result.grandTotal).toBe(30000);
  });
});

describe("calculateItem - quantity > 1", () => {
  it("qty 2, rate 6000 => base 12000", () => {
    const calc = calculateItem(makeItem({ quantity: 2, rate: 6000 }));
    expect(calc.baseAmount).toBe(12000);
    expect(calc.totalAmount).toBe(12000);
  });
});

describe("calculateItem - SGST", () => {
  it("qty 2, rate 6000, SGST 9 => sgst 1080, total 13080", () => {
    const calc = calculateItem(makeItem({ quantity: 2, rate: 6000, sgst: 9 }));
    expect(calc.baseAmount).toBe(12000);
    expect(calc.sgstAmount).toBe(1080);
    expect(calc.totalAmount).toBe(13080);
  });
});

describe("calculateItem - CGST", () => {
  it("qty 2, rate 6000, CGST 9 => base 12000, cgst 1080, total 13080", () => {
    const calc = calculateItem(makeItem({ quantity: 2, rate: 6000, cgst: 9 }));
    expect(calc.baseAmount).toBe(12000);
    expect(calc.cgstAmount).toBe(1080);
    expect(calc.totalAmount).toBe(13080);
  });
});

describe("calculateItem - Cess", () => {
  it("qty 1, rate 1000, cess 5 => cess 50, total 1050", () => {
    const calc = calculateItem(makeItem({ quantity: 1, rate: 1000, cess: 5 }));
    expect(calc.cessAmount).toBe(50);
    expect(calc.totalAmount).toBe(1050);
  });
});

describe("calculateItem - mixed tax values", () => {
  it("qty 2, rate 6000, sgst 9, cgst 9, cess 1 => total 13560", () => {
    const calc = calculateItem(makeItem({ quantity: 2, rate: 6000, sgst: 9, cgst: 9, cess: 1 }));
    expect(calc.baseAmount).toBe(12000);
    expect(calc.sgstAmount).toBe(1080);
    expect(calc.cgstAmount).toBe(1080);
    expect(calc.cessAmount).toBe(120);
    expect(calc.totalTax).toBe(2280);
    expect(calc.totalAmount).toBe(14280);
  });
});

describe("calculateItem - zero values", () => {
  it("all zero fields produce zero amounts", () => {
    const calc = calculateItem(makeItem());
    expect(calc.baseAmount).toBe(0);
    expect(calc.totalAmount).toBe(0);
  });
});

describe("calculateItem - decimal rates", () => {
  it("qty 3, rate 99.99 => base 299.97", () => {
    const calc = calculateItem(makeItem({ quantity: 3, rate: 99.99 }));
    expect(calc.baseAmount).toBeCloseTo(299.97, 2);
  });

  it("avoids floating point drift across many decimal items", () => {
    const items = Array.from({ length: 10 }, () => makeItem({ quantity: 1, rate: 0.1 }));
    const result = calculateInvoice(items);
    expect(result.subtotal).toBe(1);
  });
});

describe("calculateInvoice - large invoice", () => {
  it("handles 20 items with mixed tax without drift", () => {
    const items = Array.from({ length: 20 }, (_, i) =>
      makeItem({ id: String(i), quantity: 2, rate: 6000, cgst: 9, sgst: 9 })
    );
    const result = calculateInvoice(items);
    expect(result.subtotal).toBe(240000);
    expect(result.totalSgst).toBe(21600);
    expect(result.totalCgst).toBe(21600);
    expect(result.grandTotal).toBe(283200);
  });
});

describe("calculateItem - negative/invalid guards", () => {
  it("clamps negative quantity and rate to zero", () => {
    const calc = calculateItem(makeItem({ quantity: -5, rate: -100 }));
    expect(calc.baseAmount).toBe(0);
  });

  it("treats NaN as zero", () => {
    const calc = calculateItem(makeItem({ quantity: Number.NaN, rate: 100 }));
    expect(calc.baseAmount).toBe(0);
  });
});

describe("worked example from spec", () => {
  it("qty 2, rate 6000, CGST 9 => base 12000, cgst 1080, item total 13080", () => {
    const calc = calculateItem(makeItem({ quantity: 2, rate: 6000, cgst: 9 }));
    expect(calc.baseAmount).toBe(12000);
    expect(calc.cgstAmount).toBe(1080);
    expect(calc.totalAmount).toBe(13080);
  });
});
