import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/attachments.json');

type Attachment = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const readAttachments = (): Attachment[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

export const getAllAttachments = async (): Promise<Attachment[]> => {
  return readAttachments();
};

export const getAttachmentById = async (id: number): Promise<Attachment | null> => {
  const attachments = readAttachments();
  return attachments.find(a => a.id === id) || null;
};