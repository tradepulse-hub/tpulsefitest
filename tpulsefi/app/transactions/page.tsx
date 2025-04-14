import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TransactionsPage() {
  // Mock transaction data
  const transactions = [
    {
      id: "tx1",
      type: "Buy",
      token: "TPF",
      amount: "100",
      price: "10 WLD",
      date: "2023-04-15",
      status: "Completed",
    },
    {
      id: "tx2",
      type: "Sell",
      token: "MEME",
      amount: "500",
      price: "0.5 WLD",
      date: "2023-04-14",
      status: "Completed",
    },
    {
      id: "tx3",
      type: "Stake",
      token: "TPF",
      amount: "50",
      price: "-",
      date: "2023-04-13",
      status: "Completed",
    },
    {
      id: "tx4",
      type: "Send",
      token: "WLD",
      amount: "2",
      price: "-",
      date: "2023-04-12",
      status: "Completed",
    },
    {
      id: "tx5",
      type: "Create Token",
      token: "DEFI",
      amount: "-",
      price: "5 WLD",
      date: "2023-04-10",
      status: "Completed",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2 w-full">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View your transaction history</p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent activity on TPulseFi</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50">
                  <TableHead>Type</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-gray-800/50">
                    <TableCell className="font-medium">{tx.type}</TableCell>
                    <TableCell>{tx.token}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.price}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500/10 text-green-500">
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
