import { Router } from 'express';
import multer from 'multer';
import { downloadFile, uploadFile } from '../controllers/file.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/download', downloadFile); // public
router.post('/upload', authMiddleware, upload.single('file'), uploadFile); // protected upload

export default router;