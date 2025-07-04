import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkTheme } from "@/lib/clerk-theme";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"
import { SanityLive } from "@/sanity/lib/live"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Toaster } from "@/components/ui/sonner";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Cheemsdev",
    default: "Cheemsdev",
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`, 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkTheme}>
      <html lang="en" suppressHydrationWarning>
        <link rel="icon" href="/favicon.ico" />
        <body
          className={cn(
            "min-h-screen bg-background dark font-sans antialiased overscroll-none",
            fontSans.variable
          )}
        >
          {children}
          <Toaster position="top-center" richColors />
          <Analytics />
          <SanityLive />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
