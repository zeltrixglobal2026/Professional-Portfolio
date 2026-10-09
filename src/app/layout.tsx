import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "./globals.css";
import InitialLoader from "@/components/InitialLoader";
import PageLoader from "@/components/PageLoader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Full Stack Developer",
  description: "Full Stack Developer Portfolio — MERN, Next.js, modern web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="font-[var(--font-poppins)] antialiased bg-[#0f0a1e] text-purple-50">

        {/* First-visit welcome screen (3s) */}
        <InitialLoader />

        {/* Route-change loader (500ms per navigation) */}
        <PageLoader />

        {children}
      </body>
    </html>
  );
}