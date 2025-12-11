import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '..', 'data');

function readJson<T>(filename: string): T {
  const file = path.join(dataDir, filename);
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJson(filename: string, data: any) {
  const file = path.join(dataDir, filename);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export const PartsService = {
  list: () => readJson<any[]>('parts.json'),
  getById: (id: string) => {
    const list = readJson<any[]>('parts.json');
    return list.find(p => p.id === id);
  }
};

export const CartService = {
  get: () => readJson<any>('cart.json'),
  save: (cartObj: any) => writeJson('cart.json', cartObj)
};

export const OrdersService = {
  list: () => readJson<any[]>('orders.json'),
  save: (orders: any[]) => writeJson('orders.json', orders)
};
