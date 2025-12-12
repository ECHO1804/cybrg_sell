// Mock Supabase FIRST
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn(),
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn()
        })
      })
    })
  }
}));

// Mock service SECOND
jest.mock('../services/file.service');

import { Request, Response } from 'express';
import * as fileController from './file.controller';
import * as fileService from '../services/file.service';

const mockReq = {} as Partial<Request>;
const mockRes = { 
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  download: jest.fn()
} as any;

describe('File Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockReq, { file: undefined });
  });

  describe('downloadFile', () => {
    it('downloads sample file', () => {
      const mockFilePath = '/path/to/sample.pdf';
      (fileService.getSampleFile as jest.Mock).mockReturnValue(mockFilePath);

      fileController.downloadFile(mockReq as Request, mockRes);

      expect(fileService.getSampleFile).toHaveBeenCalled();
      expect(mockRes.download).toHaveBeenCalledWith(mockFilePath, 'sample.pdf');
    });
  });

  describe('uploadFile', () => {
    it('returns 400 when no file uploaded', () => {
      mockReq.file = undefined;

      fileController.uploadFile(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No file uploaded' });
    });

    it('uploads file successfully', () => {
      const mockFile = { path: '/tmp/uploaded.pdf' } as Express.Multer.File;
      const mockSavedPath = '/uploads/123456-sample.pdf';
      
      mockReq.file = mockFile;
      (fileService.saveFile as jest.Mock).mockReturnValue(mockSavedPath);

      fileController.uploadFile(mockReq as Request, mockRes);

      expect(fileService.saveFile).toHaveBeenCalledWith(mockFile);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'File uploaded successfully',
        filePath: mockSavedPath
      });
    });

    it('returns 500 on upload error', () => {
      const mockFile = { path: '/tmp/uploaded.pdf' } as Express.Multer.File;
      
      mockReq.file = mockFile;
      (fileService.saveFile as jest.Mock).mockImplementation(() => {
        throw new Error('Save failed');
      });

      fileController.uploadFile(mockReq as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Upload failed' });
    });
  });
});
