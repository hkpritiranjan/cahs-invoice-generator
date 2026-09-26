"use client";

import { useRef, useState } from "react";
import { useInvoice } from "@/hooks/useInvoice";
import { InvoiceLogo } from "@/components/invoice/InvoiceLogo";
import { Button } from "@/components/ui/Button";
import { NumberInput } from "@/components/ui/NumberInput";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

export function LogoUploader() {
  const { state, updateLogo } = useInvoice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a PNG, JPG, or SVG image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Logo image must be smaller than 2MB.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      updateLogo({ dataUrl: reader.result as string });
    };
    reader.onerror = () => setError("Could not read that file. Please try again.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <InvoiceLogo logo={state.logo} shortName="CAHS" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              {state.logo.dataUrl ? "Replace Logo" : "Upload Logo"}
            </Button>
            {state.logo.dataUrl && (
              <Button variant="danger" onClick={() => updateLogo({ dataUrl: undefined })}>
                Remove
              </Button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            aria-label="Upload logo image"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          label="Logo Width (px)"
          value={state.logo.width}
          min={24}
          onChange={(width) => updateLogo({ width })}
        />
        <NumberInput
          label="Logo Height (px)"
          value={state.logo.height}
          min={24}
          onChange={(height) => updateLogo({ height })}
        />
      </div>
    </div>
  );
}
