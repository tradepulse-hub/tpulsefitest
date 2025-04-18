import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WorldAppProvider } from "@/components/wallet/world-app-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TPulseFi",
  description: "Decentralized Finance on World Chain and PulseChain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WorldAppProvider>{children}</WorldAppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'