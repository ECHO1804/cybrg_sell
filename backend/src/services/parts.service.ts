import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../data/parts.json');

export type Part = {
  id: string | number;
  name: string;
  category: string;
  description?: string;
  base_price: number;
  quality_tier?: string;
  rating?: number;
  reviews_count?: number;
  images?: string[];
  available_attachments_slot?: number;
  available_perks_slot?: number;
  [k: string]: any;
};

const readData = (): Part[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  try { return JSON.parse(raw); } catch { return []; }
};

const writeData = (data: Part[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export const getAllParts = async (): Promise<Part[]> => {
  return readData();
};

export const getPartById = async (id: string | number): Promise<Part | null> => {
  const parts = readData();
  return parts.find(p => String(p.id) === String(id)) || null;
};

export const createPart = async (payload: Partial<Part>): Promise<Part> => {
  const parts = readData();
  const newPart: Part = { id: Date.now(), ...payload } as Part;
  parts.push(newPart);
  writeData(parts);
  return newPart;
};

export const updatePart = async (id: string | number, payload: Partial<Part>): Promise<Part | null> => {
  const parts = readData();
  const idx = parts.findIndex(p => String(p.id) === String(id));
  if (idx === -1) return null;
  parts[idx] = { ...parts[idx], ...payload };
  writeData(parts);
  return parts[idx];
};

export const deletePart = async (id: string | number): Promise<boolean> => {
  let parts = readData();
  const originalLen = parts.length;
  parts = parts.filter(p => String(p.id) !== String(id));
  writeData(parts);
  return parts.length !== originalLen;
};