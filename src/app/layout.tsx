import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2048 Game",
  description: "Combine tiles to get 2048 in this addictive number puzzle game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="Zadpj3bBaM7_6ZxzwU8pEi_jFLCN0zQfhoJFA-oghkQ" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
