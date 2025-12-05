import { Router } from 'express';
import { getSellers, addSeller, removeSeller } from '../controllers/seller.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getSellers);
router.post('/', authMiddleware, addSeller);
router.delete('/:id', authMiddleware, removeSeller);

export default router;
