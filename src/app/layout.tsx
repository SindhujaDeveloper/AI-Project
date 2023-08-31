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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Play the popular 2048 game online with new game modes and challenges. Enjoy 2048 cupcakes, 8x8 board, hacked versions, and more. Puzzle game fun for all ages."
        />
        <meta
          name="keywords"
          content="2048 game, 2048 new game, 2048 cupcakes, 2048 8x8, hacked 2048, online 2048, 2048 pokemon, puzzle game, play 2048, 2048 puzzles, puzzle games, 2048 god mode, 2020 puzzle game"
        />
        <meta
          name="google-site-verification"
          content="Zadpj3bBaM7_6ZxzwU8pEi_jFLCN0zQfhoJFA-oghkQ"
        />
        <link rel="canonical" href="https://your-2048-game-site.com" />
        <title>Play 2048 Game - New Modes, Cupcakes, 8x8 Board, and More</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
