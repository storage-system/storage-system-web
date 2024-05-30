import SessionWrapper from "@/components/session-provider";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/query-client";
import { Toaster } from "@/components/ui/toaster";

const mainFontFamily = Noto_Sans({
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
    <SessionWrapper>
      <QueryClientProvider client={queryClient}>
        <html lang="pt" className={mainFontFamily.variable}>
          <body>{children}</body>
          <Toaster />
        </html>
      </QueryClientProvider>
    </SessionWrapper>
  );
}
