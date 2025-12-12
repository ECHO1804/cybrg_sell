jest.mock('../config/supabase');
jest.mock('bcryptjs');

import { registerUser, loginUser } from './auth.services';
import { supabase } from '../config/supabase';
import bcrypt from 'bcryptjs';

const mockSupabase = supabase as jest.Mocked<typeof supabase>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('registers user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = '$2a$10$hashedpassword';
      const mockUser = { id: 1, email, password: hashedPassword };
      
      mockBcrypt.hash.mockResolvedValue(hashedPassword);
      mockSupabase.from('Users').insert([{ email, password: hashedPassword }])
        .select().single().mockResolvedValue({ data: mockUser, error: null });

      const result = await registerUser(email, password);

      expect(mockBcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(mockSupabase.from).toHaveBeenCalledWith('Users');
      expect(result).toEqual({ data: mockUser, error: null });
    });

    it('handles registration error', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = '$2a$10$hashed';
      
      mockBcrypt.hash.mockResolvedValue(hashedPassword);
      mockSupabase.from('Users').insert([{ email, password: hashedPassword }])
        .select().single().mockResolvedValue({ data: null, error: new Error('Email exists') });

      const result = await registerUser(email, password);

      expect(result).toEqual({ data: null, error: expect.any(Error) });
    });
  });

  describe('loginUser', () => {
    it('returns user by email', async () => {
      const email = 'test@example.com';
      const mockUser = { id: 1, email, password: 'hashed' };
      
      mockSupabase.from('Users').select('*').eq('email', email).single()
        .mockResolvedValue({ data: mockUser, error: null });

      const result = await loginUser(email);

      expect(mockSupabase.from).toHaveBeenCalledWith('Users');
      expect(mockSupabase.from('Users').select('*').eq).toHaveBeenCalledWith('email', email);
      expect(result).toEqual({ data: mockUser, error: null });
    });

    it('handles user not found', async () => {
      const email = 'nonexistent@example.com';
      
      mockSupabase.from('Users').select('*').eq('email', email).single()
        .mockResolvedValue({ data: null, error: null });

      const result = await loginUser(email);

      expect(result).toEqual({ data: null, error: null });
    });

    it('handles database error', async () => {
      const email = 'test@example.com';
      
      mockSupabase.from('Users').select('*').eq('email', email).single()
        .mockResolvedValue({ data: null, error: new Error('DB error') });

      const result = await loginUser(email);

      expect(result).toEqual({ data: null, error: expect.any(Error) });
    });
  });
});
