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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ClipboardList } from "lucide-react";

const PAGE_SIZE = 10;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const skip = (currentPage - 1) * PAGE_SIZE;

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: {
      transactions: {
        where: {
          category: { in: ["ORDER_BUY", "ORDER_SELL"] },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE,
      },
    },
  });

  if (!wallet) redirect("/login");

  // Total count for pagination
  const totalOrders = await prisma.transaction.count({
    where: {
      walletId: userId,
      category: { in: ["ORDER_BUY", "ORDER_SELL"] },
    },
  });

  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
  const orders = wallet.transactions;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ClipboardList className="size-6 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Your filled order history
          </p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Order History
          </CardTitle>
          <CardDescription>
            {totalOrders} order{totalOrders !== 1 && "s"} total
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No orders yet.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-semibold font-mono">
                        {order.ticker ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.category === "ORDER_BUY"
                              ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/10"
                              : "border-red-500/40 text-red-500 bg-red-500/10"
                          }>
                          {order.category === "ORDER_BUY" ? "Buy" : "Sell"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        ${Number(order.price ?? 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {order.quantity ?? "—"}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        ${Number(order.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {order.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/orders?page=${currentPage - 1}`}
                        aria-disabled={currentPage === 1}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    <PaginationItem className="text-sm text-muted-foreground px-4 flex items-center">
                      Page {currentPage} of {totalPages}
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href={`/orders?page=${currentPage + 1}`}
                        aria-disabled={currentPage === totalPages}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
