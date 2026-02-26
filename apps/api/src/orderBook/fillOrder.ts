import type { orderDataType } from "../types/orderSchema.js";
import { orderBook } from "./orderBook.js";

export function fillOrder(order: orderDataType, userId: string) {
  let remainingQty = order.quantity;

  // BUY → match against ASKS
  if (order.side === "buy") {
    const asks = orderBook.asks;

    for (const price of asks.prices) {
      // Stop if price is worse than limit price
      if (order.orderType === "limit" && price > order.price) {
        break;
      }

      const level = asks.levels.get(price)!;
      while (level.length > 0 && remainingQty > 0) {
        const restingOrder = level[0];
        if (!restingOrder) break;
        const fillQty = Math.min(restingOrder.quantity, remainingQty);

        // Apply fill
        restingOrder.quantity -= fillQty;
        remainingQty -= fillQty;

        // TODO: record trade here
        // maker = restingOrder.userId
        // taker = userId

        // Remove fully filled resting order
        if (restingOrder.quantity === 0) {
          level.shift(); // FIFO
        }
      }

      // Remove empty price level
      if (level.length === 0) {
        asks.levels.delete(price);
        asks.prices.shift(); // because asks.prices is ASC
      }

      if (remainingQty === 0) break;
    }
  }

  // SELL → match against BIDS
  if (order.side === "sell") {
    const bids = orderBook.bids;

    for (const price of bids.prices) {
      if (
        order.orderType === "limit" &&
        order.price !== undefined &&
        price < order.price
      ) {
        break;
      }

      const level = bids.levels.get(price)!;

      while (level.length > 0 && remainingQty > 0) {
        const restingOrder = level[0];
        if (!restingOrder) break;

        const fillQty = Math.min(restingOrder.quantity, remainingQty);

        restingOrder.quantity -= fillQty;
        remainingQty -= fillQty;

        // TODO: record trade

        if (restingOrder.quantity === 0) {
          level.shift();
        }
      }

      if (level.length === 0) {
        bids.levels.delete(price);
        bids.prices.shift(); // bids.prices is DESC
      }

      if (remainingQty === 0) break;
    }
  }

  return remainingQty;
}
