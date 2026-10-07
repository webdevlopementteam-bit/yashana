import { Outfit, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const body = Outfit({ subsets: ["latin"], variable: "--font-body" });
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata = {
  title: "Yashana Polymers | PC, ABS & PBT Engineering Polymers — Delhi, India",
  description:
    "Yashana Polymers manufactures and supplies premium PC, ABS and PBT engineering polymers. ISO 9001 & 14001 certified, RoHS compliant, batch-coded 25 kg packing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
