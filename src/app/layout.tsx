import { DM_Sans } from "next/font/google";
import "./globals.css";

const mainFontFamily = DM_Sans({
  weight: ["300", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-family-main",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={mainFontFamily.variable}>
      <body>{children}</body>
    </html>
  );
}
