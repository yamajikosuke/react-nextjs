import type { Metadata } from "next";
import { AppProviders } from "@/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "react-nextjs starter",
  description: "Next.js 15 + React 19 + TypeScript starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
