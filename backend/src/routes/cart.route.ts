import { Router } from "express";
import { getCart, addToCart, deleteFromCart, updateCart } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", deleteFromCart);
router.put("/:id", updateCart);

export default router;