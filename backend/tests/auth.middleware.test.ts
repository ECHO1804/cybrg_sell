import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from './auth.middleware';

// Mock BEFORE any imports that use it
jest.mock('../utils/jwt', () => ({
  verifyToken: jest.fn()  // Create fn INSIDE factory
}));

import { verifyToken } from '../utils/jwt';

const mockNext = jest.fn() as NextFunction;

describe('Auth Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: jest.Mocked<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockReq = { headers: {} } as Partial<Request>;
    mockRes = { 
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
  });

  it('calls next() when valid Bearer token', () => {
    const mockToken = 'valid.token';
    const mockDecoded = { id: 1, email: 'user@example.com' };
    
    (verifyToken as jest.Mock).mockReturnValue(mockDecoded);
    (mockReq.headers as any).authorization = `Bearer ${mockToken}`;

    authMiddleware(mockReq as Request, mockRes, mockNext);

    expect(verifyToken).toHaveBeenCalledWith(mockToken);
    expect((mockReq as any).user).toEqual(mockDecoded);
    expect(mockNext).toHaveBeenCalled();
  });

  it('returns 401 without authorization header', () => {
    authMiddleware(mockReq as Request, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('returns 401 without Bearer prefix', () => {
    (mockReq.headers as any).authorization = 'Basic token';

    authMiddleware(mockReq as Request, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('returns 403 on invalid token', () => {
    const mockToken = 'invalid.token';
    (mockReq.headers as any).authorization = `Bearer ${mockToken}`;
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(mockReq as Request, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });
});
