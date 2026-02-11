import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroBanner() {
  return (
    <Card className="mt-6 bg-gradient-to-r from-background to-muted">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold">
          Earn 5.16% APY on your SOL collateral
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Lend SOL to earn staking yield + lending yield, and use as collateral.
        </p>

        <Button className="mt-6">Lend SOL</Button>
      </CardContent>
    </Card>
  );
}
