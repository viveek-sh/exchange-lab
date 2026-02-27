import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Item = {
  name: string;
  price: string;
  change: number;
};

export default function MarketCard({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="text-sm">{item.name}</span>
            <span className="text-sm font-medium">{item.price}</span>
            <Badge variant={item.change >= 0 ? "default" : "destructive"}>
              {item.change}%
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
