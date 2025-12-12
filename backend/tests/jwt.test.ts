import { signToken, verifyToken } from './jwt';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('JWT Service', () => {
  const mockSecret = 'test-secret';
  process.env.JWT_SECRET = mockSecret;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signToken', () => {
    it('signs valid payload', () => {
      const payload = { userId: 1 };
      const mockToken = 'mocked.token';
      (jwt.sign as jest.MockedFunction<typeof jwt.sign>).mockReturnValue(mockToken);

      const result = signToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(payload, mockSecret, { expiresIn: '1d' });
      expect(result).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    it('verifies valid token', () => {
      const mockToken = 'valid.token';
      const mockPayload = { userId: 1 };
      (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockReturnValue(mockPayload);

      const result = verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
      expect(result).toEqual(mockPayload);
    });

    it('handles invalid token', () => {
      const mockToken = 'invalid.token';
      (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => verifyToken(mockToken)).toThrow('Invalid token');
    });
  });
});
