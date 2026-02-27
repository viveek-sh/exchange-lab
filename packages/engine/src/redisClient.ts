import {
  TRADE_ADDED,
  ORDER_UPDATE,
  TICKER_UPDATE,
  DEPTH_UPDATE,
} from "./types/engineEvents.js";
import { createClient } from "redis";
import type { RedisClientType } from "redis";
import type { WsMessage } from "./types/engineWS.js";
import { MessageToApi } from "@exchange-lab/api/src/types/engineResponse"

type DbMessage =
  | {
      type: typeof TRADE_ADDED;
      data: {
        id: string;
        isBuyer: boolean;
        price: string;
        quantity: string;
        quoteQuantity: string;
        timestamp: number;
        market: string;
      };
    }
  | {
      type: typeof ORDER_UPDATE;
      data: {
        orderId: string;
        executedQty: number;
        market?: string;
        price?: string;
        quantity?: string;
        side?: "buy" | "sell";
      };
    };
