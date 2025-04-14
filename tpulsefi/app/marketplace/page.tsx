"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Search } from "lucide-react"

// Mock token data
const tokens = [
  {
    id: "tpf",
    name: "TPulseFi",
    symbol: "TPF",
    logo: "/placeholder.svg?height=40&width=40",
    price: 0.1, // in WLD
    marketCap: 100000,
    contract: "0x834a73c0a83F3BCe349A116FFB2A4c2d1C651E45",
  },
  {
    id: "memecoin1",
    name: "Meme Coin",
    symbol: "MEME",
    logo: "/placeholder.svg?height=40&width=40",
    price: 0.001,
    marketCap: 50000,
    contract: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: "defitoken",
    name: "DeFi Protocol",
    symbol: "DEFI",
    logo: "/placeholder.svg?height=40&width=40",
    price: 0.5,
    marketCap: 250000,
    contract: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedToken, setSelectedToken] = useState<(typeof tokens)[0] | null>(null)
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleTokenSelect = (token: (typeof tokens)[0]) => {
    setSelectedToken(token)
    setBuyAmount("")
    setSellAmount("")
  }

  const handleBuy = () => {
    // In a real app, this would interact with the blockchain
    console.log(
      `Buying ${buyAmount} ${selectedToken?.symbol} for ${Number.parseFloat(buyAmount) * (selectedToken?.price || 0)} WLD`,
    )
    setBuyAmount("")
  }

  const handleSell = () => {
    // In a real app, this would interact with the blockchain
    console.log(
      `Selling ${sellAmount} ${selectedToken?.symbol} for ${Number.parseFloat(sellAmount) * (selectedToken?.price || 0)} WLD`,
    )
    setSellAmount("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Token Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell tokens created on TPulseFi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 h-full">
              <CardHeader>
                <CardTitle>Available Tokens</CardTitle>
                <CardDescription>Browse tokens to trade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredTokens.length > 0 ? (
                    filteredTokens.map((token) => (
                      <div
                        key={token.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted ${
                          selectedToken?.id === token.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleTokenSelect(token)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={token.logo || "/placeholder.svg"}
                            alt={token.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{token.name}</p>
                            <p className="text-sm text-muted-foreground">{token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{token.price} WLD</p>
                          <p className="text-sm text-muted-foreground">MC: {token.marketCap.toLocaleString()} WLD</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No tokens found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedToken ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedToken.logo || "/placeholder.svg"}
                        alt={selectedToken.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <CardTitle>
                          {selectedToken.name} ({selectedToken.symbol})
                        </CardTitle>
                        <CardDescription>Current Price: {selectedToken.price} WLD</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Contract</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{selectedToken.contract}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="buy">Buy</TabsTrigger>
                      <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="buy-amount">Amount to Buy ({selectedToken.symbol})</Label>
                        <Input
                          id="buy-amount"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-center py-2">
                        <ArrowLeftRight className="rotate-90 text-muted-foreground" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="buy-cost">Cost (WLD)</Label>
                        <Input
                          id="buy-cost"
                          type="number"
                          placeholder="0.00"
                          readOnly
                          value={buyAmount ? (Number.parseFloat(buyAmount) * selectedToken.price).toFixed(6) : ""}
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Transaction Fee: 1%</p>
                        <p>
                          Total Cost:{" "}
                          {buyAmount ? (Number.parseFloat(buyAmount) * selectedToken.price * 1.01).toFixed(6) : "0.00"}{" "}
                          WLD
                        </p>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleBuy}
                        disabled={!buyAmount || Number.parseFloat(buyAmount) <= 0}
                      >
                        Buy {selectedToken.symbol}
                      </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="sell-amount">Amount to Sell ({selectedToken.symbol})</Label>
                        <Input
                          id="sell-amount"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-center py-2">
                        <ArrowLeftRight className="rotate-90 text-muted-foreground" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sell-receive">You will receive (WLD)</Label>
                        <Input
                          id="sell-receive"
                          type="number"
                          placeholder="0.00"
                          readOnly
                          value={sellAmount ? (Number.parseFloat(sellAmount) * selectedToken.price).toFixed(6) : ""}
                        />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Transaction Fee: 1%</p>
                        <p>
                          Total Received:{" "}
                          {sellAmount
                            ? (Number.parseFloat(sellAmount) * selectedToken.price * 0.99).toFixed(6)
                            : "0.00"}{" "}
                          WLD
                        </p>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleSell}
                        disabled={!sellAmount || Number.parseFloat(sellAmount) <= 0}
                      >
                        Sell {selectedToken.symbol}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-900 border-gray-800 h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">Select a token from the list to trade</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
