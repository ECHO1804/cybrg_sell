import { Router } from 'express';
import { getAllParts, getPartById, createPart, updatePart, deletePart } from '../controllers/parts.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();


router.get('/', getAllParts);
router.get('/:id', getPartById);

// protected routes
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;