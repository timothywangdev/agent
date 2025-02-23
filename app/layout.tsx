import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayout } from "./components/layout/root-layout";
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Agent Platform",
  description: "An AI-powered platform for conversations and data providers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
        <Toaster />
      </body>
    </html>
  );
}
