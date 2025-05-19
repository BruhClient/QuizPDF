import type { Metadata } from "next";
import { Inter, Sofia_Sans } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/components/providers/AppProvider";
import Navbar from "@/components/common/Navbar";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Sofia_Sans({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuizPDF",
  description: "Created by Travis Ang",
};

export default function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${sans.variable} ${serif.variable} font-sans antialiased
          bg-background text-foreground
          transition-colors duration-300 ease-in-out
        `}
      >
        <AppProvider>
          {/* Background Pattern (fades with theme) */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors duration-300 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <Navbar />
          {authModal}

          <main>{children}</main>

          <Toaster />

          {/* Theme toggle button */}
          <div className="fixed bottom-4 right-4">
            <ModeToggle />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
