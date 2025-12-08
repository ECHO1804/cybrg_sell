import { Router } from "express";
import { getCart, addToCart, deleteFromCart, updateCart } from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/:id", authMiddleware, deleteFromCart);
router.put("/:id", authMiddleware, updateCart);

export default router;