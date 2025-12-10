import type { Request, Response } from 'express';
import * as ordersService from '../services/orders.services';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // Optional: filter by user
    const { data, error } = await ordersService.getAllOrders(userId);
    
    if (error) {
      return res.status(500).json({ message: 'Failed to load orders' });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { data, error } = await ordersService.getOrderById(req.params.id);
    
    if (error || !data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load order' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 'user-123';
    const orderData = { ...req.body, user_id: userId };
    
    const { data, error } = await ordersService.createOrder(orderData);
    
    if (error) {
      return res.status(400).json({ message: 'Failed to create order' });
    }
    
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { data, error } = await ordersService.updateOrder(req.params.id, req.body);
    
    if (error || !data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { data, error } = await ordersService.deleteOrder(req.params.id);
    
    if (error || !data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
};