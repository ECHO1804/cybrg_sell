import { Router } from "express";
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/orders.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;