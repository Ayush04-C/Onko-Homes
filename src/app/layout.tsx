import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from '@/components/CustomCursor/CustomCursor';

export const metadata: Metadata = {
  title: "OKNO Modhomes",
  description: "Homes, built differently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
