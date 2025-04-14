"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight } from "lucide-react"
import { ConnectWallet } from "@/components/connect-wallet"

export default function WalletPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [balance, setBalance] = useState({
    tpf: 0,
    wld: 0,
  })

  const handleWalletConnection = (connected: boolean) => {
    setIsWalletConnected(connected)
    if (connected) {
      // Mock data - in a real app, this would come from the blockchain
      setBalance({
        tpf: 100,
        wld: 5,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <div className="text-center space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your tokens and transactions</p>
        </div>

        {!isWalletConnected ? (
          <ConnectWallet onConnect={handleWalletConnection} />
        ) : (
          <>
            <Card className="w-full bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Your Balance</CardTitle>
                <CardDescription>Current token holdings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">TPF</p>
                    <p className="text-sm text-muted-foreground">TPulseFi Token</p>
                  </div>
                  <p className="text-xl font-bold">{balance.tpf.toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">WLD</p>
                    <p className="text-sm text-muted-foreground">World ID Token</p>
                  </div>
                  <p className="text-xl font-bold">{balance.wld.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
                <TabsTrigger value="receive">Receive</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Buy Tokens</CardTitle>
                    <CardDescription>Purchase TPF tokens with WLD</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount">Amount (WLD)</Label>
                      <Input id="buy-amount" type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowLeftRight className="rotate-90 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receive-amount">You will receive (TPF)</Label>
                      <Input id="receive-amount" type="number" placeholder="0.00" readOnly value="0.00" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Exchange Rate: 1 WLD = 10 TPF</p>
                      <p>Transaction Fee: 1%</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Buy TPF</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Sell Tokens</CardTitle>
                    <CardDescription>Sell TPF tokens for WLD</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sell-amount">Amount (TPF)</Label>
                      <Input id="sell-amount" type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>

                    <div className="flex items-center justify-center">
                      <ArrowLeftRight className="rotate-90 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receive-wld">You will receive (WLD)</Label>
                      <Input id="receive-wld" type="number" placeholder="0.00" readOnly value="0.00" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Exchange Rate: 10 TPF = 1 WLD</p>
                      <p>Transaction Fee: 1%</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Sell TPF</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="send" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Send Tokens</CardTitle>
                    <CardDescription>Transfer tokens to another wallet</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="token-type">Token</Label>
                      <select className="w-full p-2 border rounded-md" id="token-type">
                        <option value="tpf">TPF</option>
                        <option value="wld">WLD</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input id="recipient" placeholder="0x..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="send-amount">Amount</Label>
                      <Input id="send-amount" type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Transaction Fee: 1%</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Send</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="receive" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Receive Tokens</CardTitle>
                    <CardDescription>Share your address to receive tokens</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-muted w-48 h-48 flex items-center justify-center rounded-lg">
                        <p className="text-sm text-muted-foreground">QR Code</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wallet-address">Your Wallet Address</Label>
                      <div className="flex gap-2">
                        <Input id="wallet-address" readOnly value="0x834a73c0a83F3BCe349A116FFB2A4c2d1C651E45" />
                        <Button variant="outline" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-copy"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c0-1.1.9-2 2-2h2" />
                            <path d="M4 12c0-1.1.9-2 2-2h2" />
                            <path d="M4 8c0-1.1.9-2 2-2h2" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
