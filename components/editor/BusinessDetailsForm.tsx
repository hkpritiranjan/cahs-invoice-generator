"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { NumberInput } from "@/components/ui/NumberInput";
import type { AppearanceSettings } from "@/types/invoice";

const TOGGLES: { key: keyof AppearanceSettings; label: string }[] = [
  { key: "showHsnSac", label: "HSN/SAC column" },
  { key: "showSgst", label: "SGST column" },
  { key: "showCgst", label: "CGST column" },
  { key: "showCess", label: "Cess column" },
  { key: "showPan", label: "PAN" },
  { key: "showContact", label: "Contact number" },
  { key: "showEmail", label: "Email address" },
];

export function BusinessDetailsForm() {
  const { state, updateNatureOfBusiness, updateAppearance } = useInvoice();
  const { appearance } = state;

  return (
    <div className="flex flex-col gap-5">
      <Textarea
        label="Nature of Business"
        rows={3}
        value={state.invoice.natureOfBusiness}
        onChange={(e) => updateNatureOfBusiness(e.target.value)}
      />

      <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
        <p className="text-xs font-semibold text-neutral-600">Appearance / Print Settings</p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Invoice Title"
            value={appearance.invoiceTitle}
            onChange={(e) => updateAppearance({ invoiceTitle: e.target.value })}
          />
          <Input
            label="Currency Symbol"
            value={appearance.currencySymbol}
            onChange={(e) => updateAppearance({ currencySymbol: e.target.value })}
          />
          <NumberInput
            label="Body Font Size (px)"
            value={appearance.fontSize}
            min={8}
            onChange={(fontSize) => updateAppearance({ fontSize })}
          />
          <NumberInput
            label="Table Font Size (px)"
            value={appearance.tableFontSize}
            min={8}
            onChange={(tableFontSize) => updateAppearance({ tableFontSize })}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
          {TOGGLES.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={Boolean(appearance[key])}
                onChange={(e) => updateAppearance({ [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
