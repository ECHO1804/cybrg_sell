import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/perks.json');

type Perk = {
  id: number;
  name: string;
  price: number;
  tier: string;
};

const readPerks = (): Perk[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

export const getAllPerks = async (): Promise<Perk[]> => {
  return readPerks();
};

export const getPerkById = async (id: number): Promise<Perk | null> => {
  const perks = readPerks();
  return perks.find(p => p.id === id) || null;
};