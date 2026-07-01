import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CartDrawer } from "@/components/cart/cart-drawer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amoralaces.com"),
  title: {
    default: "AMORA LACES | Front Laces e Wigs Premium",
    template: "%s | AMORA LACES",
  },
  description:
    "AMORA LACES: front laces e wigs premium com elegancia, qualidade internacional e atendimento personalizado no WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://amoralaces.com",
    title: "AMORA LACES",
    description:
      "Colecoes exclusivas de front laces, perucas premium e acessorios de luxo.",
    siteName: "AMORA LACES",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CartDrawer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
