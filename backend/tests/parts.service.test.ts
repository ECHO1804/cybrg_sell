import fs from 'fs';
import { 
  getAllParts, getPartById, createPart, updatePart, deletePart 
} from '../src/services/parts.service';

jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = require('path') as jest.Mocked<typeof require('path')>;

describe('Parts Service', () => {
  const mockDataPath = '/mock/data/parts.json';
  const mockParts = [
    { id: 1, name: 'Part 1', category: 'electronics', base_price: 10 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockReturnValue(mockDataPath);
  });

  describe('getAllParts', () => {
    it('returns all parts from file', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));

      const result = await getAllParts();

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockDataPath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockDataPath, 'utf-8');
      expect(result).toEqual(mockParts);
    });

    it('returns empty array if file doesnt exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await getAllParts();

      expect(result).toEqual([]);
    });

    it('returns empty array if invalid JSON', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('invalid json');

      const result = await getAllParts();

      expect(result).toEqual([]);
    });
  });

  describe('getPartById', () => {
    it('returns part by id', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));

      const result = await getPartById(1);

      expect(result).toEqual(mockParts[0]);
    });

    it('returns null for non-existent id', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));

      const result = await getPartById(999);

      expect(result).toBeNull();
    });
  });

  describe('createPart', () => {
    it('creates new part and returns it', async () => {
      const payload = { name: 'New Part', category: 'mechanical', base_price: 20 };
      const expectedNewPart = { id: expect.any(Number), ...payload };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await createPart(payload);

      expect(mockFs.writeFileSync).toHaveBeenCalled();
      expect(result).toMatchObject(payload);
      expect(result.id).toBeDefined();
    });
  });

  describe('updatePart', () => {
    it('updates existing part', async () => {
      const payload = { base_price: 15 };
      const expectedUpdated = { ...mockParts[0], ...payload };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => JSON.stringify(mockParts));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await updatePart(1, payload);

      expect(result).toEqual(expectedUpdated);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('returns null for non-existent id', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));

      const result = await updatePart(999, { name: 'Updated' });

      expect(result).toBeNull();
    });
  });

  describe('deletePart', () => {
    it('deletes part and returns true', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));
      mockFs.writeFileSync.mockReturnValue(undefined);

      const result = await deletePart(1);

      expect(result).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('returns false if part not found', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockParts));

      const result = await deletePart(999);

      expect(result).toBe(false);
    });
  });
});
