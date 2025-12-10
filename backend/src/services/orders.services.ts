import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../data/orders.json');

type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  total_price: number;
  items_count: number;
  created_at: string;
  delivery_info: {
    address: string;
    estimated_delivery: string;
  };
  items: any[];
};

const readOrders = (): Order[] => {
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

const writeOrders = (orders: Order[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(orders, null, 2), 'utf-8');
};

export const getAllOrders = async (userId?: string) => {
  try {
    let orders = readOrders();
    if (userId) {
      orders = orders.filter(o => o.user_id === userId);
    }
    return { data: orders, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getOrderById = async (id: string) => {
  try {
    const orders = readOrders();
    const order = orders.find(o => o.id === id);
    return { data: order || null, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createOrder = async (orderData: Partial<Order>) => {
  try {
    const orders = readOrders();
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      user_id: orderData.user_id || 'user-123',
      status: 'pending',
      total_price: orderData.total_price || 0,
      items_count: orderData.items_count || 0,
      created_at: new Date().toISOString(),
      delivery_info: orderData.delivery_info || {
        address: '',
        estimated_delivery: ''
      },
      items: orderData.items || []
    };
    orders.push(newOrder);
    writeOrders(orders);
    return { data: newOrder, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateOrder = async (id: string, updates: Partial<Order>) => {
  try {
    const orders = readOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return { data: null, error: 'Order not found' };
    
    orders[index] = { ...orders[index], ...updates };
    writeOrders(orders);
    return { data: orders[index], error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteOrder = async (id: string) => {
  try {
    let orders = readOrders();
    const originalLength = orders.length;
    orders = orders.filter(o => o.id !== id);
    
    if (orders.length === originalLength) {
      return { data: null, error: 'Order not found' };
    }
    
    writeOrders(orders);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error };
  }
};