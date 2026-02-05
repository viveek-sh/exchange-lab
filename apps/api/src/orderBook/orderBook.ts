interface Order {
  orderId: string;
  price: number;
  quantity: number;
  timestamp: number;
  userId: string;
}

type PriceLevel = Order[];

interface OrderBookSide {
  levels: Map<number, PriceLevel>;
  prices: number[]; // sorted
}

interface OrderBook {
  bids: OrderBookSide; // DESC
  asks: OrderBookSide; // ASC
}

export const orderBook: OrderBook = {
  bids: {
    levels: new Map(),
    prices: [],
  },
  asks: {
    levels: new Map(),
    prices: [],
  },
};
