import { Outfit, Barlow_Condensed, Roboto } from "next/font/google";
import "./globals.css";

const body = Outfit({ subsets: ["latin"], variable: "--font-body" });
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
// heavy italic used for the "YASHANA POLYMERS" wordmark next to the logo mark
const brand = Roboto({ subsets: ["latin"], weight: ["900"], style: ["italic"], variable: "--font-brand" });

export const metadata = {
  title: "Best Engineering Polymer Supplier in Delhi | Yashana Polymers",
  description:
    "Yashana Polymers is an ISO-certified engineering polymer supplier in Delhi. Buy PC, ABS and PBT granules in batch-coded 25 kg bags. Get a quote.",
  keywords: [
    "Polycarbonate Granules Supplier",
    "Pc Granules Supplier",
    "Abs Granules Supplier",
    "PBT Granules Supplier",
    "Engineering Polymer Supplier",
    "PC DANA Supplier",
  ],
    icons:{
      icon:"/logo.jpg"
    },
  metadataBase: new URL("https://yashanapolymers.com"),
  alternates: { canonical: "/" },
  // Google Search Console ownership tag → <meta name="google-site-verification" ...>
  verification: { google: "j9SjuATGjsvKFncfjdpdOF1zl5ScTMgBrSTr3My6jqw" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${brand.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
