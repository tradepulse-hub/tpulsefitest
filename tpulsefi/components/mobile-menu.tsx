"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { name: "Wallet", href: "/wallet" },
    { name: "Staking", href: "/staking" },
    { name: "Coin Factory", href: "/factory" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Transactions", href: "/transactions" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-gray-900 border-gray-800 text-white">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <Image src="/images/logo.png" alt="TPulseFi Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold">TPulseFi</span>
        </div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-3 text-lg hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
