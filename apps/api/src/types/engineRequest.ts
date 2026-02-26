import {
  CANCEL_ORDER,
  CREATE_ORDER,
  GET_DEPTH,
  GET_OPEN_ORDERS,
  ON_RAMP,
} from "./engineResponse.js";
import { z } from "zod";
import {
  createOrderSchema,
  cancelOrderSchema,
  getOpenOrdersSchema,
} from "./orderSchema.js";
export type EngineRequest =
  | {
      type: typeof CREATE_ORDER;
      data: z.infer<typeof createOrderSchema>;
    }
  | {
      type: typeof CANCEL_ORDER;
      data: {
        orderId: string;
        market: string;
      };
    }
  | {
      type: typeof ON_RAMP;
      data: {
        amount: string;
        userId: string;
        txnId: string;
      };
    }
  | {
      type: typeof GET_DEPTH;
      data: {
        market: string;
      };
    }
  | {
      type: typeof GET_OPEN_ORDERS;
      data: {
        userId: string;
        market: string;
      };
    };
