import fs from 'fs';
import path from 'path';
import { 
  getCart, addToCart, deleteFromCart, updateCart 
} from './cart.service';

jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('Cart Service', () => {
  const mockDataPath = '/mock/data/cart.json';
  const mockCartItems = [
    { id: 1, userId: 'user1', partId: 101, quantity: 2 },
    { id: 2, userId: 'user2', partId: 102, quantity: 1 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockReturnValue(mockDataPath);
    Object.defineProperty(module, '__dirname', { value: '/mock/src/services' });
  });

  describe('getCart', () => {
    it('returns all cart items when no userId provided', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));

      const result = await getCart();

      expect(result).toEqual(mockCartItems);
    });

    it('returns cart items for specific user', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));

      const result = await getCart('user1');

      expect(result).toEqual([mockCartItems[0]]);
    });

    it('returns empty array if file doesnt exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await getCart();

      expect(result).toEqual([]);
    });

    it('returns empty array if invalid JSON', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('invalid');

      const result = await getCart();

      expect(result).toEqual([]);
    });
  });

  describe('addToCart', () => {
    it('adds new item to cart with default quantity 1', async () => {
      const itemData = { userId: 'user1', partId: 103 };
      const expectedNewItem = { id: expect.any(Number), quantity: 1, ...itemData };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await addToCart(itemData);

      expect(mockFs.writeFileSync).toHaveBeenCalled();
      expect(result).toMatchObject({ ...itemData, quantity: 1 });
      expect(result.id).toBeDefined();
    });
  });

  describe('deleteFromCart', () => {
    it('deletes cart item and returns true', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await deleteFromCart(1);

      expect(result).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('returns false if item not found', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));

      const result = await deleteFromCart(999);

      expect(result).toBe(false);
    });
  });

  describe('updateCart', () => {
    it('updates existing cart item', async () => {
      const payload = { quantity: 5 };
      const expectedUpdated = { ...mockCartItems[0], quantity: 5 };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => JSON.stringify(mockCartItems));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await updateCart(1, payload);

      expect(result).toEqual(expectedUpdated);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('returns null for non-existent id', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockCartItems));

      const result = await updateCart(999, { quantity: 10 });

      expect(result).toBeNull();
    });
  });
});
