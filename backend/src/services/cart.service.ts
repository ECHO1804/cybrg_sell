import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/cart.json');

type CartItem = {
  id: string | number;
  cart_item_id?: number;
  userId?: string | null;
  partId: string | number;
  quantity: number;
  attachments?: Array<{ id: number; name: string; price: number }>;
  perks?: Array<{ id: number; name: string; price: number }>;
  [k: string]: any;
};

const read = (): CartItem[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

const write = (data: CartItem[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export const getCart = async (userId?: string): Promise<CartItem[]> => {
  const cart = read();
  if (!userId) return cart;
  return cart.filter(c => String(c.userId) === String(userId));
};

export const addToCart = async (item: Partial<CartItem>): Promise<CartItem> => {
  const cart = read();
  const newItem: CartItem = {
    id: Date.now(),
    cart_item_id: Date.now(),
    quantity: 1,
    attachments: [],
    perks: [],
    ...item
  } as CartItem;
  cart.push(newItem);
  write(cart);
  return newItem;
};

export const deleteFromCart = async (id: string | number): Promise<boolean> => {
  let cart = read();
  const originalLen = cart.length;
  cart = cart.filter(c => 
    String(c.id) !== String(id) && 
    String(c.cart_item_id) !== String(id)
  );
  write(cart);
  return cart.length !== originalLen;
};

export const updateCart = async (
  id: string | number, 
  payload: Partial<CartItem>
): Promise<CartItem | null> => {
  const cart = read();
  const idx = cart.findIndex(c => 
    String(c.id) === String(id) || 
    String(c.cart_item_id) === String(id)
  );
  if (idx === -1) return null;
  cart[idx] = { ...cart[idx], ...payload };
  write(cart);
  return cart[idx];
};

export const clearCart = async (userId: string): Promise<void> => {
  let cart = read();
  cart = cart.filter(c => String(c.userId) !== String(userId));
  write(cart);
};