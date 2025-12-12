jest.mock('../data/orders.json', () => [
  { id: 1, customer: 'John', items: [], total: 100 }
]);

const mockOrders = require('../data/orders.json');

import { Request, Response } from 'express';
import * as ordersController from './orders.controller';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as any;

describe('Orders Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { body: {}, params: {} });
  });

  describe('getOrders', () => {
    it('returns all orders', () => {
      ordersController.getOrders(mockReq as Request, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
    });
  });

  describe('getOrderById', () => {
    it('returns order by id', () => {
      mockReq.params = { id: '1' };

      ordersController.getOrderById(mockReq as Request, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockOrders[0]);
    });

    it('returns 404 for non-existent order', () => {
      mockReq.params = { id: '999' };

      ordersController.getOrderById(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Order not found" });
    });
  });

  describe('createOrder', () => {
    it('creates new order and adds to array', () => {
      const originalOrders = [...mockOrders]; // Preserve original
      mockReq.body = { customer: 'Jane', items: [], total: 200 };

      ordersController.createOrder(mockReq as Request, mockRes);

      expect(mockOrders.length).toBe(originalOrders.length + 1);
      expect(mockOrders[mockOrders.length - 1]).toMatchObject({
        id: expect.any(Number),
        customer: 'Jane',
        items: [],
        total: 200
      });
    });
  });

  describe('updateOrder', () => {
    it('updates existing order', () => {
      mockReq.params = { id: '1' };
      mockReq.body = { total: 150 };

      ordersController.updateOrder(mockReq as Request, mockRes);

      expect(mockOrders[0].total).toBe(150);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrders[0]);
    });

    it('returns 404 for non-existent order', () => {
      mockReq.params = { id: '999' };

      ordersController.updateOrder(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteOrder', () => {
    it('deletes existing order', () => {
      const originalLength = mockOrders.length;
      mockReq.params = { id: '1' };

      ordersController.deleteOrder(mockReq as Request, mockRes);

      expect(mockOrders.length).toBe(originalLength - 1);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Order deleted" });
    });

    it('returns 404 for non-existent order', () => {
      mockReq.params = { id: '999' };

      ordersController.deleteOrder(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});
