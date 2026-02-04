interface Order {
  orderId: string;
  price: number;
  quantity: number;
  timestamp: number;
}
type PriceLevel = Order[];

interface OrderBook {
  bids: Map<number, PriceLevel>; // Bids for Purchase
  asks: Map<number, PriceLevel>; // Asks for Sell
}

export const orderBook: OrderBook = {
  bids: new Map(),
  asks: new Map(),
};
