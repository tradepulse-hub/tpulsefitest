"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Wallet } from "lucide-react"

interface ConnectWalletProps {
  onConnect: (connected: boolean) => void
}

export function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    setConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setConnecting(false)
      onConnect(true)
    }, 2000)
  }

  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Connect World Wallet</CardTitle>
        <CardDescription>Connect your World Wallet to access TPulseFi features</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Wallet className="h-16 w-16 mb-4 text-primary" />
        <p className="text-center mb-4">
          You need to connect your World Wallet to buy, sell, send, and receive tokens.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleConnect} disabled={connecting}>
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect World Wallet"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
