import type { orderDataType } from "../types/orderSchema.js";
import { orderBook } from "./orderBook.js";

export function fillOrder(order: orderDataType, userID: string) {
  const { side, price, quantity } = order;
  let remainingQty = quantity;
  if (side == "bid") {
    for( let i =orderBook.asks-1, i>=0, i--){
        if orderBook.asks[i]
    }
  }
}
