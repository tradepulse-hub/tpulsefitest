"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Upload } from "lucide-react"

export default function FactoryPage() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [telegramLink, setTelegramLink] = useState("")
  const [website, setWebsite] = useState("")
  const [sector, setSector] = useState("")
  const [description, setDescription] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogoFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateToken = () => {
    // In a real app, this would interact with the blockchain
    console.log("Creating token:", {
      name: tokenName,
      symbol: tokenSymbol,
      telegramLink,
      website,
      sector,
      description,
      logoFile,
    })

    // Reset form after submission
    setTokenName("")
    setTokenSymbol("")
    setTelegramLink("")
    setWebsite("")
    setSector("")
    setDescription("")
    setLogoFile(null)
    setLogoPreview(null)
  }

  const isFormValid = () => {
    return (
      tokenName.trim() !== "" &&
      tokenSymbol.trim() !== "" &&
      sector !== "" &&
      description.trim() !== "" &&
      logoFile !== null
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <div className="text-center space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight">Coin Factory</h1>
          <p className="text-muted-foreground">Create your own token on the blockchain</p>
        </div>

        <Card className="w-full bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Token Creation</CardTitle>
            <CardDescription>Fill in the details to create your token</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Creation Fee</AlertTitle>
              <AlertDescription>
                Creating a new token costs 5 WLD. Your token will be automatically listed on our marketplace.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-logo">Token Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Token logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                    <input
                      id="token-logo"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleLogoChange}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Upload a logo for your token</p>
                    <p>Recommended size: 512x512px</p>
                    <p>Max size: 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="token-name">Token Name</Label>
                  <Input
                    id="token-name"
                    placeholder="e.g. TPulseFi"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-symbol">Token Symbol</Label>
                  <Input
                    id="token-symbol"
                    placeholder="e.g. TPF"
                    maxLength={5}
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram-link">Telegram Link (Optional)</Label>
                  <Input
                    id="telegram-link"
                    placeholder="https://t.me/yourtokengroup"
                    value={telegramLink}
                    onChange={(e) => setTelegramLink(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourtoken.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="memecoin">MemeCoin</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your token and its purpose..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleCreateToken} disabled={!isFormValid()}>
              Create Token (5 WLD)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
