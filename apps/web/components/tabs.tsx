import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketTabs() {
  return (
    <Tabs defaultValue="futures" className="mt-8">
      <TabsList>
        <TabsTrigger value="spot">Spot</TabsTrigger>
        <TabsTrigger value="futures">Futures</TabsTrigger>
        <TabsTrigger value="lend">Lend</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
