import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reise-App | Bestill din neste tur",
  description: "Enkel og rask bestilling av fergeavganger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        <Header />
        <main>
          {children}
        </main>
        {/* You could also add a Footer here later */}
      </body>
    </html>
  );
}