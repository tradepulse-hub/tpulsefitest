"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function StakingPage() {
  const [stakedAmount, setStakedAmount] = useState(0)
  const [stakingRewards, setStakingRewards] = useState(0)
  const [stakeInput, setStakeInput] = useState("")
  const [unstakeInput, setUnstakeInput] = useState("")

  // Mock data - in a real app, this would come from the blockchain
  const availableBalance = 100
  const stakingRate = 0.01 // 1% per month
  const earlyWithdrawalPenalty = 0.001 // 0.1% penalty

  const handleStake = () => {
    const amount = Number.parseFloat(stakeInput)
    if (isNaN(amount) || amount <= 0 || amount > availableBalance) return

    setStakedAmount(stakedAmount + amount)
    setStakingRewards(stakingRewards + amount * stakingRate)
    setStakeInput("")
  }

  const handleUnstake = () => {
    const amount = Number.parseFloat(unstakeInput)
    if (isNaN(amount) || amount <= 0 || amount > stakedAmount) return

    // Apply early withdrawal penalty
    const penalty = amount * earlyWithdrawalPenalty

    setStakedAmount(stakedAmount - amount)
    setStakingRewards(Math.max(0, stakingRewards - amount * stakingRate))
    setUnstakeInput("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <div className="text-center space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight">Staking</h1>
          <p className="text-muted-foreground">Stake your TPF tokens and earn rewards</p>
        </div>

        <Card className="bg-gray-900 border-gray-800 w-full">
          <CardHeader>
            <CardTitle>Staking Overview</CardTitle>
            <CardDescription>Your current staking position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-2xl font-bold">{stakedAmount.toFixed(2)} TPF</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Estimated Rewards</p>
                <p className="text-2xl font-bold">{stakingRewards.toFixed(2)} TPF</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold">{availableBalance.toFixed(2)} TPF</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">APR</p>
                <p className="text-2xl font-bold">12%</p>
              </div>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Staking Information</AlertTitle>
              <AlertDescription>
                Earn 1% monthly returns on your staked TPF tokens. Tokens are locked for 1 month. Early withdrawal
                incurs a 0.1% penalty.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Stake TPF</CardTitle>
                <CardDescription>Lock your tokens to earn rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stake-amount">Amount to Stake</Label>
                  <Input
                    id="stake-amount"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={stakeInput}
                    onChange={(e) => setStakeInput(e.target.value)}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span>Available: {availableBalance.toFixed(2)} TPF</span>
                  <Button
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => setStakeInput(availableBalance.toString())}
                  >
                    Max
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Lock Period</Label>
                  <div className="p-3 bg-muted rounded-md">1 Month</div>
                </div>

                <div className="space-y-2">
                  <Label>Estimated Monthly Reward</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {isNaN(Number.parseFloat(stakeInput))
                      ? "0.00"
                      : (Number.parseFloat(stakeInput) * stakingRate).toFixed(2)}{" "}
                    TPF
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleStake}
                  disabled={
                    !stakeInput ||
                    Number.parseFloat(stakeInput) <= 0 ||
                    Number.parseFloat(stakeInput) > availableBalance
                  }
                >
                  Stake TPF
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="unstake" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Unstake TPF</CardTitle>
                <CardDescription>Withdraw your staked tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                  <Input
                    id="unstake-amount"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={unstakeInput}
                    onChange={(e) => setUnstakeInput(e.target.value)}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span>Staked: {stakedAmount.toFixed(2)} TPF</span>
                  <Button
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => setUnstakeInput(stakedAmount.toString())}
                  >
                    Max
                  </Button>
                </div>

                <Alert variant="destructive">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Early Withdrawal Warning</AlertTitle>
                  <AlertDescription>
                    Unstaking before the 1-month lock period will incur a 0.1% penalty.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label>Penalty Amount</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {isNaN(Number.parseFloat(unstakeInput))
                      ? "0.00"
                      : (Number.parseFloat(unstakeInput) * earlyWithdrawalPenalty).toFixed(2)}{" "}
                    TPF
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleUnstake}
                  disabled={
                    !unstakeInput ||
                    Number.parseFloat(unstakeInput) <= 0 ||
                    Number.parseFloat(unstakeInput) > stakedAmount
                  }
                >
                  Unstake TPF
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
