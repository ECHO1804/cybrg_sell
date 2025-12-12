import { Request, Response, NextFunction } from 'express';
import errorHandler from './errorHandler.middleware';

const mockNext = jest.fn() as NextFunction;

describe('Error Handler Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: jest.Mocked<Response>;
  let mockConsoleError: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockReq = {} as Partial<Request>;
    mockRes = { 
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
    
    // Mock console.error
    mockConsoleError = jest.fn();
    const originalConsoleError = console.error;
    Object.defineProperty(global.console, 'error', {
      value: mockConsoleError,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    // Restore console.error
    if (console.error && typeof console.error === 'function') {
      Object.defineProperty(global.console, 'error', {
        value: console.error,
        writable: true,
        configurable: true
      });
    }
  });

  it('handles error with status and message', () => {
    const mockError = { 
      status: 400, 
      message: 'Validation failed' 
    };

    errorHandler(mockError, mockReq as Request, mockRes, mockNext);

    expect(mockConsoleError).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ 
      message: 'Validation failed' 
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('handles error with only message', () => {
    const mockError = { message: 'Custom error' };

    errorHandler(mockError, mockReq as Request, mockRes, mockNext);

    expect(mockConsoleError).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ 
      message: 'Custom error' 
    });
  });

  it('handles error with no status or message', () => {
    const mockError = new Error('Random error');

    errorHandler(mockError, mockReq as Request, mockRes, mockNext);

    expect(mockConsoleError).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ 
      message: 'Internal server error' 
    });
  });

  it('handles plain object error', () => {
    const mockError = {};

    errorHandler(mockError, mockReq as Request, mockRes, mockNext);

    expect(mockConsoleError).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ 
      message: 'Internal server error' 
    });
  });
});
