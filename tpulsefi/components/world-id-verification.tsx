"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function WorldIdVerification() {
  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "verified">("idle")
  const router = useRouter()

  const handleVerify = async () => {
    setVerificationState("verifying")

    // Simulate verification process
    setTimeout(() => {
      setVerificationState("verified")

      // Redirect to wallet page after successful verification
      setTimeout(() => {
        router.push("/wallet")
      }, 1500)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      {verificationState === "idle" && (
        <Button className="w-full" size="lg" onClick={handleVerify}>
          Verify with World ID
        </Button>
      )}

      {verificationState === "verifying" && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Verifying your World ID...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {verificationState === "verified" && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p>World ID Verified!</p>
              <p className="text-sm text-muted-foreground">Redirecting to wallet...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
