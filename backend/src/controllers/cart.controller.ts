import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const payload = { ...req.body, userId };
    const item = await cartService.addToCart(payload);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const ok = await cartService.deleteFromCart(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const updated = await cartService.updateCart(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Cart item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};