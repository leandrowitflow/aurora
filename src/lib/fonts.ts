import { Epilogue, Manrope } from "next/font/google";

export const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["700"],
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "700"],
  display: "swap",
});
