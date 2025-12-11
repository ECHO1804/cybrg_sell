import type { Request, Response } from 'express';
import { getSampleFile, saveFile } from '../services/file.service';

export const downloadFile = (req: Request, res: Response) => {
  const filePath = getSampleFile();
  res.download(filePath, "sample.pdf");
};

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const filePath = saveFile(req.file);
    res.json({ message: "File uploaded successfully", filePath });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};