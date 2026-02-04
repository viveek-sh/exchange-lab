import { Router } from "express";
import { addOrder } from "../orderBook/addorder.js";
import { orderBook } from "../orderBook/orderBook.js";
import { getOrderBook } from "../orderBook/getDepth.js";
import { orderInputSchema } from "../types/orderSchema.js";

const router = Router();

router.post("/", (req, res) => {
  const parsedOrder = orderInputSchema.safeParse(req.body);
  if (!parsedOrder.success) {
    return res.status(400).json({
      error: "Invalid order Input",
      details: parsedOrder.error,
    });
  }
  const order = parsedOrder.data;
  //Entry to the order book queue
  const newOrder = addOrder(order);

  res.status(201).json({ status: "open", newOrder });
});

router.get("/status", (req, res) => {
  //Orer Status Here
});

router.get("/depth", (req, res) => {
  res.json({ depth: getOrderBook() }).status(200);
});

router.post("/quote", (req, res) => {
  //Get Price Qute for Market Order Status Here
});

// router.delete("/:id", (req, res) => {
//   cancelOrder(req.params.id);
//   res.json({ status: "cancelled" });
// });

export default router;
