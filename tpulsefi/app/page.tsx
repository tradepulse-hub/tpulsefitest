import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { WorldIdVerification } from "@/components/world-id-verification"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">TPulseFi</h1>
          <p className="text-muted-foreground">Your decentralized finance hub on WorldApp</p>
        </div>

        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Welcome to TPulseFi</CardTitle>
            <CardDescription>Verify your World ID to get started with TPulseFi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WorldIdVerification />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">By continuing, you agree to our terms and conditions</p>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <Link href="/wallet" className="w-full">
            <Card className="h-full hover:shadow-md transition-shadow bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Buy, sell, send and receive tokens</CardDescription>
              </CardHeader>
              <CardContent>Manage your TPF tokens and other assets with our secure wallet interface.</CardContent>
            </Card>
          </Link>

          <Link href="/staking" className="w-full">
            <Card className="h-full hover:shadow-md transition-shadow bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Staking</CardTitle>
                <CardDescription>Earn 1% monthly returns</CardDescription>
              </CardHeader>
              <CardContent>Stake your TPF tokens and earn passive income with our staking program.</CardContent>
            </Card>
          </Link>

          <Link href="/factory" className="w-full">
            <Card className="h-full hover:shadow-md transition-shadow bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Coin Factory</CardTitle>
                <CardDescription>Create your own token</CardDescription>
              </CardHeader>
              <CardContent>Launch your own token with customizable parameters for just 5 WLD.</CardContent>
            </Card>
          </Link>

          <Link href="/marketplace" className="w-full">
            <Card className="h-full hover:shadow-md transition-shadow bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>Trade created tokens</CardDescription>
              </CardHeader>
              <CardContent>Buy and sell tokens created on our platform with WLD pairs.</CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
