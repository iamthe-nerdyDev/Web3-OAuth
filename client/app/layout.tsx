import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import localFont from "next/font/local";
// import { ThemeProvider } from "next-themes ";
import "./globals.css";

const myFont = localFont({
  src: "../public/font/Chillax-Medium.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
