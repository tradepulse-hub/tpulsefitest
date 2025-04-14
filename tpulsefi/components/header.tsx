"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "./mobile-menu"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Wallet", href: "/wallet" },
    { name: "Staking", href: "/staking" },
    { name: "Coin Factory", href: "/factory" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Transactions", href: "/transactions" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="TPulseFi Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold text-white">TPulseFi</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-white" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
