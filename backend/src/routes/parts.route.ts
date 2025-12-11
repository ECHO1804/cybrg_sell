import { Router } from 'express';
import { getAllParts, getPartById, createPart, updatePart, deletePart } from '../controllers/parts.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllParts);
router.get('/:id', getPartById);

// Protected routes 
router.post('/', authMiddleware, createPart);
router.put('/:id', authMiddleware, updatePart);
router.delete('/:id', authMiddleware, deletePart);

export default router;