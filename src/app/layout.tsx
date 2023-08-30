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
      <meta name="keywords" content="play2048.co, 2048 cupcakes, 2048 8x8, 2048 hacked, 2048 online, 2048 pokemon, 2048 new game, 2048 netlify, 2048 ai, 2048 web, play 2048, puzzle games, 2048 god mode, puzzle games for kids, puzzle games for adults, puzzle game 2020, 2020"/>
      <meta name="google-site-verification" content="Zadpj3bBaM7_6ZxzwU8pEi_jFLCN0zQfhoJFA-oghkQ" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
