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
      })
    })
  }
}));

jest.mock('../services/seller.service');

import { Request, Response } from 'express';
import { getSellers, addSeller, removeSeller } from './seller.controller';
import * as sellerService from '../services/seller.service';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn()
} as any;

describe('Seller Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { body: {}, params: {} });
  });

  describe('getSellers', () => {
    it('returns all sellers on success', async () => {
      const mockSellers = [{ id: 1, name: 'Seller 1' }];
      (sellerService.getAllSellers as jest.Mock).mockResolvedValue({ 
        data: mockSellers, 
        error: null 
      });

      await getSellers(mockReq as Request, mockRes);

      expect(sellerService.getAllSellers).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockSellers);
    });

    it('returns 500 error on service failure', async () => {
      const mockError = { message: 'DB error' };
      (sellerService.getAllSellers as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: mockError 
      });

      await getSellers(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(mockError);
    });
  });

  describe('addSeller', () => {
    it('creates seller and returns 201', async () => {
      const mockSellerData = { id: 2, name: 'New Seller' };
      mockReq.body = { name: 'New Seller' };
      (sellerService.createSeller as jest.Mock).mockResolvedValue({ 
        data: mockSellerData, 
        error: null 
      });

      await addSeller(mockReq as Request, mockRes);

      expect(sellerService.createSeller).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockSellerData);
    });

    it('returns 500 on create error', async () => {
      mockReq.body = { name: 'Duplicate' };
      (sellerService.createSeller as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: { message: 'Duplicate' } 
      });

      await addSeller(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Duplicate' });
    });
  });

  describe('removeSeller', () => {
    it('deletes seller and returns success message', async () => {
      mockReq.params = { id: '5' };
      (sellerService.deleteSeller as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: null 
      });

      await removeSeller(mockReq as Request, mockRes);

      expect(sellerService.deleteSeller).toHaveBeenCalledWith(5);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Seller deleted' });
    });

    it('returns 500 on delete error', async () => {
      mockReq.params = { id: '999' };
      (sellerService.deleteSeller as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: { message: 'Not found' } 
      });

      await removeSeller(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Not found' });
    });
  });
});
