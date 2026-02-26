import HeroBanner from "@/components/heroBanner";
import MarketOverview from "@/components/marketOverview";
import MarketTabs from "@/components/tabs";
import MarketTable from "@/components/marketTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <HeroBanner />
        <MarketOverview />
        <MarketTabs />
        <MarketTable />
      </div>
    </main>
  );
}
