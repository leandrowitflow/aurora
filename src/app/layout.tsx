import type { Metadata } from "next";
import { ConsentGoogleAnalytics } from "@/components/ConsentGoogleAnalytics";
import { LazyAuroraAssistant } from "@/components/LazyAuroraAssistant";
import { LazyCookieConsent } from "@/components/LazyCookieConsent";
import { epilogue, manrope } from "@/lib/fonts";
import "./globals.css";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Coletivo Aurora",
  description:
    "A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${epilogue.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {gaMeasurementId ? (
          <ConsentGoogleAnalytics measurementId={gaMeasurementId} />
        ) : null}
        {children}
        <LazyCookieConsent />
        <LazyAuroraAssistant />
      </body>
    </html>
  );
}
