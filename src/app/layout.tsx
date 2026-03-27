import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexandre Roy — Portfolio",
  description: "Développeur · Québec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
