import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { BottomNav } from "@/components/navigation/BottomNav";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "MYNBALA - Детский развлекательный парк",
  description:
    "MYNBALA - веселье каждый день! Детский парк развлечений с аттракционами, ресторанами и праздниками для всей семьи в Тараз, Шымкент, Аксу и Атырау.",
  keywords: [
    "MYNBALA",
    "детский парк",
    "аттракционы",
    "развлечения",
    "Казахстан",
    "Тараз",
    "Шымкент",
    "день рождения",
  ],
  authors: [{ name: "MYNBALA" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MYNBALA",
  },
  openGraph: {
    title: "MYNBALA - Детский развлекательный парк",
    description: "Веселье каждый день!",
    type: "website",
    locale: "ru_KZ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#7DD957",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className={`min-h-screen safe-area-layout ${montserrat.variable}`}>
        <AuthProvider>
          <div className="pb-20 lg:pb-0">{children}</div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
