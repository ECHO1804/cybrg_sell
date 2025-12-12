// Mock your ACTUAL service imports
jest.mock('../services/auth.services', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn()
}));

jest.mock('../utils/jwt', () => ({
  signToken: jest.fn(() => 'fake-jwt-token')
}));

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));

import { Request, Response } from 'express';
import { register, login } from './auth.controller';
import { registerUser, loginUser } from '../services/auth.services';
import { signToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(), 
  json: jest.fn() 
} as any;

describe('Auth Controller - REAL LOGIC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { body: {} });
  });

  describe('register', () => {
    it('returns success when service succeeds', async () => {
      mockReq.body = { email: 'test@example.com', password: 'pass' };
      (registerUser as jest.Mock).mockResolvedValue({ 
        data: { id: 1 }, 
        error: null 
      });

      await register(mockReq as Request, mockRes);

      expect(registerUser).toHaveBeenCalledWith('test@example.com', 'pass');
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Registered successfully", 
        data: { id: 1 }
      });
    });

    it('returns 400 on service error', async () => {
      mockReq.body = { email: 'dup@example.com', password: 'pass' };
      (registerUser as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: { message: 'Email exists' } 
      });

      await register(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('returns token when password valid', async () => {
      mockReq.body = { email: 'test@example.com', password: 'pass' };
      (loginUser as jest.Mock).mockResolvedValue({ 
        data: { id: 1, email: 'test@example.com', password: '$2b$10$' }, 
        error: null 
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (signToken as jest.Mock).mockReturnValue('jwt.token');

      await login(mockReq as Request, mockRes);

      expect(bcrypt.compare).toHaveBeenCalled();
      expect(signToken).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Login success", 
        token: 'jwt.token'
      });
    });
  });
});
