import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentic-b0b11523.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Boutik Express",
    default: "Boutik Express — Votre boutique en ligne en 5 minutes",
  },
  description:
    "Boutik Express aide les petits commerçants africains à créer une vitrine en ligne avec prise de commandes via WhatsApp.",
  openGraph: {
    title: "Boutik Express",
    description:
      "Créez votre boutique en ligne en 5 minutes et recevez vos commandes par WhatsApp.",
    url: siteUrl,
    siteName: "Boutik Express",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutik Express",
    description:
      "Créez votre boutique en ligne en 5 minutes et recevez vos commandes par WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
