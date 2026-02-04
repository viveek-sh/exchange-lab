import { orderBook } from "./orderBook.js";
import type { orderDataType } from "../types/orderSchema.js";

export function addOrder(input: orderDataType) {
  const { side, price, quantity } = input;

  if (!price) {
    throw new Error("Price required for limit order");
  }

  const bookSide = side === "buy" ? orderBook.bids : orderBook.asks;

  const order = {
    orderId: crypto.randomUUID(),
    side,
    price,
    quantity,
    timestamp: Date.now(),
  };

  if (!bookSide.has(price)) {
    bookSide.set(price, []);
  }

  bookSide.get(price)!.push(order);
  return order;
}
