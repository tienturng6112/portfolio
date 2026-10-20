import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SecurityWrapper from "@/components/SecurityWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trung Tiến | Portfolio Marketing Ads",
  description: "Portfolio chuyên viên Performance Marketing Ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Bọc toàn bộ trang web bằng SecurityWrapper */}
        {/* <SecurityWrapper>
          </SecurityWrapper> */}
          {children}
        
        <SpeedInsights />
      </body>
    </html>
  );
}
