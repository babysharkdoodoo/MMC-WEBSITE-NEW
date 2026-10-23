// app/layout.tsx
import BackToTop from "@/components/back-to-top";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import "./circle.css";

// Site Metadata
export const metadata: Metadata = {
  title: "Melbourne Math Circle",
  description:
    "Free, student-led math sessions and outreach in Melbourne, Florida. A local chapter of Orlando Math Circle.",
  icons: {
    icon: { url: "/mmc_logo.jpg", type: "image/jpeg" },
    shortcut: "/mmc_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="mmc-site"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main className="flex-grow relative">{children}</main>
          <Footer />

          {/* Back-to-Top: hidden on mobile, fixed out-of-flow on sm+ */}
          <div className="hidden sm:block fixed bottom-6 right-6 z-50">
            <BackToTop />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
