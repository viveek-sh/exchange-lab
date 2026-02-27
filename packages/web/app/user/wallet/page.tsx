import { prisma } from "@exchange-lab/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);

  const userId = session!.user.id;

  const [wallet, transactions] = await Promise.all([
    prisma.wallet.findUnique({
      where: { userId },
    }),
    prisma.transaction.findMany({
      where: { walletId: userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!wallet) redirect("/login");

  const totalInvested = transactions
    .filter((tx) => tx.type === "DEBIT")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center gap-3">
        <Wallet className="size-6 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wallet</h1>
          <p className="text-sm text-muted-foreground">
            Your virtual funds and transaction history
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-1">
            <CardDescription>Available Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              $
              {Number(wallet.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardDescription>Total Invested</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              $
              {totalInvested.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance After</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="flex items-center gap-2 font-medium">
                    {tx.type === "CREDIT" ? (
                      <ArrowDownLeft className="size-4 text-emerald-500 shrink-0" />
                    ) : (
                      <ArrowUpRight className="size-4 text-red-500 shrink-0" />
                    )}
                    {tx.description}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {tx.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        tx.type === "CREDIT"
                          ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/10"
                          : "border-red-500/40 text-red-500 bg-red-500/10"
                      }>
                      {tx.type === "CREDIT" ? "Credit" : "Debit"}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono font-medium ${
                      tx.type === "CREDIT" ? "text-emerald-500" : "text-red-500"
                    }`}>
                    {tx.type === "CREDIT" ? "+" : "-"}$
                    {Number(tx.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground text-sm">
                    ${Number(tx.balanceAfter).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
