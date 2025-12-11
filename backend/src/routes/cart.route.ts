import { Router } from 'express';
import { getCart, addToCart, updateCart, deleteFromCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteFromCart);

export default router;