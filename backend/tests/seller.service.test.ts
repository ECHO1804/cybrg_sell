import { getAllSellers, createSeller, deleteSeller } from './seller.service';

// 1. Mock BEFORE importing supabase
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn()
  }
}));

import { supabase } from '../config/supabase';

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('Seller Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock for each test
    mockSupabase.from.mockReturnValue({
      select: jest.fn(),
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn()
        })
      }),
      delete: jest.fn().mockReturnValue({
        eq: jest.fn()
      })
    } as any);
  });

  describe('getAllSellers', () => {
    it('returns all sellers successfully', async () => {
      const mockSellers = [{ id: 1, name: 'Seller 1' }];
      
      // Chain the mocks properly
      (mockSupabase.from('Seller').select('*') as jest.Mock).mockResolvedValue({ 
        data: mockSellers, 
        error: null 
      });

      const result = await getAllSellers();

      expect(mockSupabase.from).toHaveBeenCalledWith('Seller');
      expect(mockSupabase.from('Seller').select).toHaveBeenCalledWith('*');
      expect(result).toEqual({ data: mockSellers, error: null });
    });
  });

  describe('createSeller', () => {
    it('creates seller successfully', async () => {
      const sellerData = { name: 'New Seller' };
      const mockCreatedSeller = { id: 3, ...sellerData };
      
      // Chain the mocks properly
      const mockInsert = mockSupabase.from('Seller').insert([sellerData]);
      const mockSelect = mockInsert.select();
      (mockSelect.single() as jest.Mock).mockResolvedValue({ 
        data: mockCreatedSeller, 
        error: null 
      });

      const result = await createSeller(sellerData);

      expect(mockSupabase.from).toHaveBeenCalledWith('Seller');
      expect(mockSupabase.from('Seller').insert).toHaveBeenCalledWith([sellerData]);
      expect(result).toEqual({ data: mockCreatedSeller, error: null });
    });
  });

  describe('deleteSeller', () => {
    it('deletes seller successfully', async () => {
      const mockDelete = mockSupabase.from('Seller').delete();
      (mockDelete.eq('id', 1) as jest.Mock).mockResolvedValue({ 
        data: null, 
        error: null 
      });

      const result = await deleteSeller(1);

      expect(mockSupabase.from).toHaveBeenCalledWith('Seller');
      expect(mockSupabase.from('Seller').delete).toHaveBeenCalled();
      expect(mockSupabase.from('Seller').delete().eq).toHaveBeenCalledWith('id', 1);
      expect(result).toEqual({ data: null, error: null });
    });
  });
});
