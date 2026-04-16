import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macta Flow Loyalty & CDP",
  description: "Prototype loyalty and customer data workspace for Macta.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
