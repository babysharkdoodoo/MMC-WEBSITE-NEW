// app/layout.tsx
import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { IBM_Plex_Mono, STIX_Two_Text, Quicksand } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Toaster } from "@/components/ui/toaster"

// Fonts
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
})

const stixTwo = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-stix-two",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
})

// Site Metadata
export const metadata: Metadata = {
  title: "Melbourne Math Circle",
  description: "A monthly student-led math workshop series in Melbourne, Florida, run by high school students.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${stixTwo.variable} ${quicksand.variable}`}
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
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Ensure these components are "use client" if needed */}
          <Header />
          <main className="flex-grow relative">{children}</main>
          <Footer />
          <BackToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
