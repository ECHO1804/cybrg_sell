import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controllers';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authMiddleware, getProfile);

export default router;