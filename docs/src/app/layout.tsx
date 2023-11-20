import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Search Params",
  description: "Manage URL Search Params",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Providers>
        <body className={`${inter.className} min-h-screen px-4 py-12`}>
          <main className="max-w-2xl w-full mx-auto">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
