import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-inter", // mapped to --font-sans in globals
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KMoney Store | Premium eFootball Accounts",
  description: "Your ultimate destination for the best eFootball accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative text-white bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
