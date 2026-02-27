import MarketCard from "./marketCard";
import { newMarkets, movers, popular } from "@/lib/mockData";

export default function MarketOverview() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <MarketCard title="New" items={newMarkets} />
      <MarketCard title="Top Movers" items={movers} />
      <MarketCard title="Popular" items={popular} />
    </section>
  );
}
