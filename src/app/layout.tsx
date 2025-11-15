import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Dock } from "@/widgets/Dock";
import { Providers } from "./providers";
import { Toaster } from "@/shared/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flexxx",
  description: "Event Tickets",
  applicationName: "Flexxx",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-screen w-full`}
      >
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <Providers>{children}</Providers>
        <Dock className="fixed bottom-0 left-0 right-0 z-50" />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
