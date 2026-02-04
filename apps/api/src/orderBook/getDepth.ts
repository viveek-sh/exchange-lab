import { orderBook } from "./orderBook.js";

type DepthLevel = {
  price: number;
  quantity: number;
};

function getDepthSide(
  book: Map<number, { quantity: number }[]>,
  bid: boolean,
  levels: number,
) {
  return Array.from(book.entries()) // Convert Map Into array
    .sort((a, b) => (bid ? b[0] - a[0] : a[0] - b[0])) // sort descending if bid (buy)
    .slice(0, levels) // levels
    .map(([price, orders]) => ({
      // then again remap price to the average quantity
      price,
      quantity: orders.reduce((sum, o) => sum + o.quantity, 0),
    }));
}
export function getOrderBook(levels = 10) {
  return {
    bids: getDepthSide(orderBook.bids, true, levels),
    asks: getDepthSide(orderBook.asks, false, levels),
  };
}
