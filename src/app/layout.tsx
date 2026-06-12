import type { Metadata } from "next";
import { AuroraAssistant } from "@/components/AuroraAssistant";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { epilogue, manrope, poppins, roboto } from "@/lib/fonts";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Coletivo Aurora",
  description:
    "A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${epilogue.variable} ${manrope.variable} ${poppins.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}
        {children}
        <CookieConsent />
        <AuroraAssistant />
      </body>
    </html>
  );
}
