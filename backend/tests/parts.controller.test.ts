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
jest.mock('../services/parts.service');

import { Request, Response } from 'express';
import * as partsController from './parts.controller';
import * as partsService from '../services/parts.service';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as any;

describe('Parts Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { body: {}, params: {} });
  });

  describe('getAllParts', () => {
    it('returns all parts successfully', async () => {
      const mockParts = [{ id: 1, name: 'Part 1' }];
      (partsService.getAllParts as jest.Mock).mockResolvedValue({ data: mockParts, error: null });

      await partsController.getAllParts(mockReq as Request, mockRes);

      expect(partsService.getAllParts).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockParts);
    });

    it('returns 500 on service error', async () => {
      (partsService.getAllParts as jest.Mock).mockRejectedValue(new Error('DB error'));

      await partsController.getAllParts(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to load parts' });
    });
  });

  describe('getPartById', () => {
    it('returns part by id', async () => {
      mockReq.params = { id: '1' };
      const mockPart = { id: 1, name: 'Part 1' };
      (partsService.getPartById as jest.Mock).mockResolvedValue({ data: mockPart, error: null });

      await partsController.getPartById(mockReq as Request, mockRes);

      expect(partsService.getPartById).toHaveBeenCalledWith('1');
      expect(mockRes.json).toHaveBeenCalledWith(mockPart);
    });

    it('returns 404 when part not found', async () => {
      mockReq.params = { id: '999' };
      (partsService.getPartById as jest.Mock).mockResolvedValue({ data: null, error: null });

      await partsController.getPartById(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Part not found' });
    });
  });

  describe('createPart', () => {
    it('creates part and returns 201', async () => {
      mockReq.body = { name: 'New Part' };
      const mockCreated = { id: 2, name: 'New Part' };
      (partsService.createPart as jest.Mock).mockResolvedValue({ data: mockCreated, error: null });

      await partsController.createPart(mockReq as Request, mockRes);

      expect(partsService.createPart).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreated);
    });
  });

  describe('updatePart', () => {
    it('updates part successfully', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { name: 'Updated' };
      const mockUpdated = { id: 1, name: 'Updated' };
      (partsService.updatePart as jest.Mock).mockResolvedValue({ data: mockUpdated, error: null });

      await partsController.updatePart(mockReq as Request, mockRes);

      expect(partsService.updatePart).toHaveBeenCalledWith('1', mockReq.body);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdated);
    });

    it('returns 404 when part not found', async () => {
      mockReq.params = { id: '999' };
      (partsService.updatePart as jest.Mock).mockResolvedValue({ data: null, error: null });

      await partsController.updatePart(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deletePart', () => {
    it('deletes part successfully', async () => {
      mockReq.params = { id: '1' };
      (partsService.deletePart as jest.Mock).mockResolvedValue({ data: true, error: null });

      await partsController.deletePart(mockReq as Request, mockRes);

      expect(partsService.deletePart).toHaveBeenCalledWith('1');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Part deleted' });
    });

    it('returns 404 when part not found', async () => {
      mockReq.params = { id: '999' };
      (partsService.deletePart as jest.Mock).mockResolvedValue({ data: false, error: null });

      await partsController.deletePart(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});
