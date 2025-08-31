import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/css/reset.css";
import "./styles/css/base.css";
import "./styles/css/global.css";
import Header from "./components/layout/header/Header";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lesson講座販売アプリ",
  description: "動画レッスンを販売するアプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider />
        <Header />
        {children}
      </body>
    </html>
  );
}
