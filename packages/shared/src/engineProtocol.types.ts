export type EngineRequest =
  | {
      type: "CREATE_ORDER";
      data: CreateOrderInput;
    }
  | {
      type: "CANCEL_ORDER";
      data: CancelOrderInput;
    }
  | {
      type: "ON_RAMP";
      data: {
        amount: string;
        userId: string;
        txnId: string;
      };
    }
  | {
      type: "GET_DEPTH";
      data: {
        market: string;
      };
    }
  | {
      type: "GET_OPEN_ORDERS";
      data: GetOpenOrdersInput;
    };

export type EngineResponse =
  | {
      type: "DEPTH";
      payload: {
        market: string;
        bids: [string, string][];
        asks: [string, string][];
      };
    }
  | {
      type: "ORDER_PLACED";
      payload: {
        orderId: string;
        executedQty: number;
        fills: {
          price: string;
          qty: number;
          tradeId: number;
        }[];
      };
    }
  | {
      type: "ORDER_CANCELLED";
      payload: {
        orderId: string;
        executedQty: number;
        remainingQty: number;
      };
    }
  | {
      type: "OPEN_ORDERS";
      payload: OpenOrder[];
    };

export type CreateOrderInput = {
  baseAsset: string;
  quoteAsset: string;
  side: "buy" | "sell";
  orderType: "limit" | "market";
  price: number;
  quantity: number;
  executionType?: "ioc";
};

export type CancelOrderInput = {
  orderId: string;
  market: string;
};

export type GetOpenOrdersInput = {
  userId: string;
  market: string;
};

export type OpenOrder = {
  orderId: string;
  executedQty: number;
  price: string;
  quantity: string;
  side: "buy" | "sell";
  userId: string;
};
