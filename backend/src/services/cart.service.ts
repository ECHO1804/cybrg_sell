import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(__dirname, '../data/cart.json');

type CartItem = {
  id: string | number;
  userId?: string | null;
  partId: string | number;
  quantity: number;
  attachments?: any[];
  perks?: any[];
  [k: string]: any;
};

const read = (): CartItem[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  try { return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')); } catch { return []; }
};
const write = (d: CartItem[]) => fs.writeFileSync(DATA_PATH, JSON.stringify(d, null, 2), 'utf-8');

export const getCart = async (userId?: string) => {
  const cart = read();
  if (!userId) return cart;
  return cart.filter(c => String(c.userId) === String(userId));
};

export const addToCart = async (item: Partial<CartItem>) => {
  const cart = read();
  const newItem: CartItem = { id: Date.now(), quantity: 1, ...item } as CartItem;
  cart.push(newItem);
  write(cart);
  return newItem;
};

export const deleteFromCart = async (id: string | number) => {
  let cart = read();
  const originalLen = cart.length;
  cart = cart.filter(c => String(c.id) !== String(id));
  write(cart);
  return cart.length !== originalLen;
};

export const updateCart = async (id: string | number, payload: Partial<CartItem>) => {
  const cart = read();
  const idx = cart.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return null;
  cart[idx] = { ...cart[idx], ...payload };
  write(cart);
  return cart[idx];
};