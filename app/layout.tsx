import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { InvoiceProvider } from "@/hooks/useInvoice";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Generate and print professional tax invoices, entirely in your browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50">
        <InvoiceProvider>{children}</InvoiceProvider>
      </body>
    </html>
  );
}
