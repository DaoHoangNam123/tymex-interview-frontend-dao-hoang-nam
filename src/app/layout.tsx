import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/src/app/StoreProvider";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NFT Game",
  description: "NFT Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
