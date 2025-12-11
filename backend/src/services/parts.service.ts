import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../data/parts.json');

const read = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

export const getAllParts = async () => {
  const parts = read();

  // frontend expects: price = "$2500"
  return parts.find(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    price: `$${p.base_price}`,
    maxAttachments: p.available_attachments_slot,
    maxPerks: p.available_perks_slot,
    image: p.images[0]
  }));
};

export const getPartById = async (id: string) => {
  const parts = read();
  const p = parts.find(x => x.id === id);
  if (!p) return null;

  return {
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    price: `$${p.base_price}`,
    maxAttachments: p.available_attachments_slot,
    maxPerks: p.available_perks_slot,
    image: p.images[0]
  };
};
