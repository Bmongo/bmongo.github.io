import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";
import { SITE_DESC, SITE_TITLE } from "@/consts";
import { getPathWithBasePath } from "@/utils/path";
import SkipContentHolder, {
  MAIN_CONTENT_ID,
} from "@/components/SkipContentHolder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning className="scroll-smooth">
      <head>
        <Script
          strategy="beforeInteractive"
          src={getPathWithBasePath("/toggle-theme.js")}
        ></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-lvh antialiased`}
      >
        <SkipContentHolder />
        <Header />
        <main id={MAIN_CONTENT_ID} className="center-content">
          {children}
        </main>
      </body>
    </html>
  );
}
