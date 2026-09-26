import type { LogoConfig } from "@/types/invoice";

type InvoiceLogoProps = {
  logo: LogoConfig;
  shortName?: string;
};

// Renders the uploaded logo image, or a default black square with the short
// business initials (matching the reference invoice's CAHS mark) when no
// logo has been uploaded.
export function InvoiceLogo({ logo, shortName = "CAHS" }: InvoiceLogoProps) {
  const style = { width: `${logo.width}px`, height: `${logo.height}px` };

  if (logo.dataUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.dataUrl} alt="Business logo" style={{ ...style, objectFit: "contain" }} />;
  }

  return (
    <div
      style={style}
      className="flex items-center justify-center bg-black text-white"
    >
      <span className="text-[10px] font-bold tracking-wide">{shortName}</span>
    </div>
  );
}
