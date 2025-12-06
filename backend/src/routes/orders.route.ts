import { Router } from "express";
import orders from "../data/orders.json";

const router = Router();

router.get("/", (req, res) => {
  res.json(orders);
});

export default router;
