import { orderBook } from "./orderBook.js";
export function getDepth(depth = 10) {
  const bids = [];
  const asks = [];

  for (const price of orderBook.bids.prices.slice(0, depth)) {
    const orders = orderBook.bids.levels.get(price)!;
    const qty = orders.reduce((s, o) => s + o.quantity, 0);

    bids.push({ price, quantity: qty });
  }

  for (const price of orderBook.asks.prices.slice(0, depth)) {
    const orders = orderBook.asks.levels.get(price)!;
    const qty = orders.reduce((s, o) => s + o.quantity, 0);

    asks.push({ price, quantity: qty });
  }

  return { bids, asks };
}
