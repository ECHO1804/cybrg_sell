import { Router } from 'express';
import { downloadFile, uploadFile } from '../controllers/file.controller';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/download', downloadFile);
router.post('/upload', upload.single('file'), uploadFile);

export default router;