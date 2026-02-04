import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "친환경 건축 법규 트래커",
  description: "친환경 건축 법규 버전 관리 및 조회 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-green-600">EcoLaw</span>
                  <span className="text-xl text-gray-600 ml-1">Tracker</span>
                </Link>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                  <Link
                    href="/laws"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600"
                  >
                    법령 목록
                  </Link>
                  <Link
                    href="/timeline"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600"
                  >
                    시점 조회
                  </Link>
                  <Link
                    href="/changelog"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600"
                  >
                    변경 이력
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500">v2026-02-03</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
