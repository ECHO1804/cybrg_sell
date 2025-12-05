import { Router } from 'express';
import { downloadFile } from '../controllers/file.controller';

const router = Router();

router.get('/download', downloadFile);

export default router;
