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
  title: "BookingTour",
  description: "Website description",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/image/favicon.png",
        href: "/image/favicon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/image/favicon.png",
        href: "/image/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <div className="max-w-auto m-auto">
       {children}
       </div>
      </body>
    </html>
  );
}
