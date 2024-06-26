import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VideoAsk",
  description:
    "interactive video that helps you streamline your conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative flex flex-col min-h-dvh max-h-dvh">
          <div className="flex-grow flex-1">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
