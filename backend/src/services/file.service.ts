import path from 'path';
import fs from 'fs';

export const getSampleFile = () => {
  return path.join(__dirname, '../../files/sample.pdf');
};

export const saveFile = (file: Express.Multer.File) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadDir, fileName);
  
  fs.renameSync(file.path, filePath);
  
  return filePath;
};