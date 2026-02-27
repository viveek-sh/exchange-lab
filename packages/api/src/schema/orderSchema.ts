import { z } from "zod";

export const createOrderSchema = z.object({
  baseAsset: z
    .string()
    .min(1)
    .regex(/^[A-Z]+$/),
  quoteAsset: z
    .string()
    .min(1)
    .regex(/^[A-Z]+$/),
  side: z.enum(["buy", "sell"]),
  orderType: z.enum(["limit", "market"]),
  price: z.number().positive(),
  quantity: z.number().positive(),
  executionType: z.enum(["ioc"]).optional(),
});

export const cancelOrderSchema = z.object({
  orderId: z.string().min(1),
  market: z.string().min(1),
});

export const getOpenOrdersSchema = z.object({
  userId: z.string().min(1),
  market: z.string().min(1),
});
