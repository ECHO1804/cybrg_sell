import { Request, Response } from 'express';
import { getSampleFile } from '../services/file.service';

export const downloadFile = (req: Request, res: Response) => {
  const filePath = getSampleFile();
  res.download(filePath, "sample.pdf");
};
