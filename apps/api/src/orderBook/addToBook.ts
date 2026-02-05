import { insertPrice } from "./binarySearch.js";
import { orderBook } from "./orderBook.js";
import crypto from "crypto";
import type { orderDataType } from "../types/orderSchema.js";

export function addToBook(input: orderDataType, userId: string) {
  const { side, price, quantity } = input;

  // do not insert empty orders
  if (quantity <= 0) {
    throw new Error("Order Completely Filled");
  }

  const bookSide = side === "buy" ? orderBook.bids : orderBook.asks;

  const ascending = side === "sell"; // asks ↑, bids ↓

  const order = {
    orderId: crypto.randomUUID(),
    price,
    quantity,
    timestamp: Date.now(),
    userId,
  };
  // New price level
  if (!bookSide.levels.has(price)) {
    bookSide.levels.set(price, []);
    insertPrice(bookSide.prices, price, ascending);
  }

  // FIFO insert
  bookSide.levels.get(price)!.push(order);

  return order;
}
