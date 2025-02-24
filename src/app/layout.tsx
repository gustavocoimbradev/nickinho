import Script from "next/script";
import { useEffect } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nickinho",
  description: "“Inteligência“ artificial mais “confiável“ da Internet"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//waust.at/t.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <meta name="theme-color" content="#818cf8" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Script id="_waustats">
          {`var _wau = _wau || []; _wau.push(["tab", "nickinho", "33u", "left-middle"]);`}
        </Script>
      </body>
    </html>
  );
}
