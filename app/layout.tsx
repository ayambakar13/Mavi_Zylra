import type { Metadata } from "next";
import "../styles/globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { SeasonalNav } from "@/components/layout/SeasonalNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CartProvider } from "@/components/commerce/CartProvider";

export const metadata: Metadata = {
  title: "Zylra | Silk Route Luxury Atelier",
  description: "Luxury wearables celebrating the confluence of Kashmir, Persia, Central Asia, and Ottoman design."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><AnnouncementBar /><Header /><SeasonalNav /><Breadcrumbs />{children}<Footer /><CookieBanner /></CartProvider></body></html>;
}
