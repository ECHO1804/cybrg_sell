import type { Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import * as partsService from '../services/parts.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const cartItems = await cartService.getCart(userId);
    
    // Enrich cart items with part details
    const enrichedCart = await Promise.all(
      cartItems.map(async (item) => {
        const part = await partsService.getPartById(item.partId);
        return {
          ...item,
          part_name: part?.name || 'Unknown Part',
          part_price: part?.base_price || 0,
          category: part?.category || 'Unknown'
        };
      })
    );
    
    res.json(enrichedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { partId, quantity, attachments, perks } = req.body;
    
    // Validate part exists
    const part = await partsService.getPartById(partId);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    
    const payload = {
      userId,
      partId,
      quantity: quantity || 1,
      attachments: attachments || [],
      perks: perks || []
    };
    
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

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    await cartService.clearCart(userId);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};