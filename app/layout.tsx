/**
 * @author Maram Aljhadli
 * @created 2026-10-19
 * @description The root layout shared by all pages. It sets the font, page metadata, and 
 * the saved theme (dark by default), then renders the current page inside it.
 */


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowbit",
  description: "Small bits. Big knowledge.",
};

const themeScript = `try{var t=localStorage.getItem('knowbit:theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}