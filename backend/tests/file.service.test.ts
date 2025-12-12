import path from 'path';
import fs from 'fs';
import { getSampleFile, saveFile } from './file.service';

jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('File Service', () => {
  const mockDirname = '/mock/src/services';
  const mockSamplePath = '/mock/files/sample.pdf';
  const mockUploadDir = '/mock/uploads';
  const mockTempPath = '/tmp/temp-file.pdf';
  const mockFinalPath = '/mock/uploads/1234567890-sample.pdf';

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock __dirname for path calculations
    Object.defineProperty(module, '__dirname', { value: mockDirname });
    mockPath.join.mockImplementation((...args: string[]) => args.join('/'));
  });

  describe('getSampleFile', () => {
    it('returns correct sample file path', () => {
      mockPath.join.mockReturnValue(mockSamplePath);

      const result = getSampleFile();

      expect(mockPath.join).toHaveBeenCalledWith(mockDirname, '../../files/sample.pdf');
      expect(result).toBe(mockSamplePath);
    });
  });

  describe('saveFile', () => {
    const mockFile = {
      originalname: 'test.pdf',
      path: mockTempPath
    } as Express.Multer.File;

    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockReturnValue(undefined);
      mockFs.renameSync.mockReturnValue(undefined);
      mockPath.join.mockReturnValue(mockFinalPath);
    });

    it('creates uploads dir and saves file if dir doesnt exist', () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = saveFile(mockFile);

      expect(mockFs.existsSync).toHaveBeenCalledWith(mockUploadDir);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(mockUploadDir, { recursive: true });
      expect(mockFs.renameSync).toHaveBeenCalledWith(mockTempPath, mockFinalPath);
      expect(result).toBe(mockFinalPath);
    });

    it('saves file if uploads dir already exists', () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = saveFile(mockFile);

      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
      expect(mockFs.renameSync).toHaveBeenCalledWith(mockTempPath, mockFinalPath);
      expect(result).toBe(mockFinalPath);
    });

    it('generates correct filename with timestamp', () => {
      const now = Date.now();
      Date.now = jest.fn(() => now);
      
      saveFile(mockFile);

      expect(mockFs.renameSync).toHaveBeenCalledWith(
        mockTempPath, 
        expect.stringContaining(`${now}-test.pdf`)
      );
    });
  });
});
