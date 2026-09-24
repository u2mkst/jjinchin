import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "찐친력 — 우리 우정 성적표",
  description:
    "친구와 링크 하나로 함께 답하고, 서로를 얼마나 아는지 찐친력 점수로 확인해보세요.",
  openGraph: {
    title: "찐친력 — 우리 우정 성적표",
    description:
      "친구와 링크 하나로 함께 답하고, 서로를 얼마나 아는지 찐친력 점수로 확인해보세요.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
