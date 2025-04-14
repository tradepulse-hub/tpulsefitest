import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "TPulseFi",
  description: "Your decentralized finance hub on WorldApp",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}


import './globals.css'