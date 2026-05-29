import type { Metadata } from "next";
import { epilogue, manrope, poppins, roboto } from "@/lib/fonts";
import "./globals.css";

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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
