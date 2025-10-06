import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/css/reset.css";
import "./styles/css/base.css";
import "./styles/css/global.css";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
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
  title: "travelvoices",
  description: "あなたの旅は、きっと意味がある",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
