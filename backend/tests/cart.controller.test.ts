// Mock Supabase FIRST
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn(),
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn()
        })
      }),
      delete: jest.fn().mockReturnValue({
        eq: jest.fn()
      }),
      update: jest.fn()
    })
  }
}));

// Mock service SECOND
jest.mock('../services/cart.service');

import { Request, Response } from 'express';
import * as cartController from './cart.controller';
import * as cartService from '../services/cart.service';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as any;

describe('Cart Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { body: {}, params: {}, user: undefined });
  });

  describe('getCart', () => {
    it('returns cart for authenticated user', async () => {
      const mockUserId = 'user123';
      const mockCart = [{ id: 1, partId: 101 }];
      
      (mockReq as any).user = { id: mockUserId };
      (cartService.getCart as jest.Mock).mockResolvedValue({ data: mockCart, error: null });

      await cartController.getCart(mockReq as Request, mockRes);

      expect(cartService.getCart).toHaveBeenCalledWith(mockUserId);
      expect(mockRes.json).toHaveBeenCalledWith(mockCart);
    });

    it('returns 500 on service error', async () => {
      (mockReq as any).user = { id: 'user123' };
      (cartService.getCart as jest.Mock).mockRejectedValue(new Error('DB error'));

      await cartController.getCart(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to load cart' });
    });
  });

  describe('addToCart', () => {
    it('adds item to cart with userId', async () => {
      const mockUserId = 'user123';
      const mockReqBody = { partId: 101, quantity: 2 };
      const mockItem = { id: 123, ...mockReqBody, userId: mockUserId };
      
      (mockReq as any).user = { id: mockUserId };
      mockReq.body = mockReqBody;
      (cartService.addToCart as jest.Mock).mockResolvedValue({ data: mockItem, error: null });

      await cartController.addToCart(mockReq as Request, mockRes);

      expect(cartService.addToCart).toHaveBeenCalledWith({ ...mockReqBody, userId: mockUserId });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockItem);
    });
  });

  describe('deleteFromCart', () => {
    it('deletes cart item successfully', async () => {
      mockReq.params = { id: '123' };
      (cartService.deleteFromCart as jest.Mock).mockResolvedValue({ data: true, error: null });

      await cartController.deleteFromCart(mockReq as Request, mockRes);

      expect(cartService.deleteFromCart).toHaveBeenCalledWith('123');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Deleted' });
    });

    it('returns 404 when cart item not found', async () => {
      mockReq.params = { id: '999' };
      (cartService.deleteFromCart as jest.Mock).mockResolvedValue({ data: false, error: null });

      await cartController.deleteFromCart(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Cart item not found' });
    });
  });

  describe('updateCart', () => {
    it('updates cart item successfully', async () => {
      mockReq.params = { id: '123' };
      mockReq.body = { quantity: 5 };
      const mockUpdated = { id: '123', quantity: 5 };
      
      (cartService.updateCart as jest.Mock).mockResolvedValue({ data: mockUpdated, error: null });

      await cartController.updateCart(mockReq as Request, mockRes);

      expect(cartService.updateCart).toHaveBeenCalledWith('123', mockReq.body);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdated);
    });

    it('returns 404 when cart item not found', async () => {
      mockReq.params = { id: '999' };
      (cartService.updateCart as jest.Mock).mockResolvedValue({ data: null, error: null });

      await cartController.updateCart(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});
