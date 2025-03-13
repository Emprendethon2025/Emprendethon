import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrustBlock - Crowdfunding con Blockchain",
  description: "Plataforma de crowdfunding Web3 con identidad digital verificada en blockchain",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        {/* <ThemeToggle attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange> */}
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        {/* </ThemeToggle> */}
      </body>
    </html>
  )
}

