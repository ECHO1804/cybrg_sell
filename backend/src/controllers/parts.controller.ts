import type { Request, Response } from 'express';
import * as partsService from '../services/parts.service';

export const getAllParts = async (req: Request, res: Response) => {
  try {
    const parts = await partsService.getAllParts();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load parts' });
  }
};

export const getPartById = async (req: Request, res: Response) => {
  try {
    const part = await partsService.getPartById(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load part' });
  }
};

export const createPart = async (req: Request, res: Response) => {
  try {
    const created = await partsService.createPart(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create part' });
  }
};

export const updatePart = async (req: Request, res: Response) => {
  try {
    const updated = await partsService.updatePart(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Part not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update part' });
  }
};

export const deletePart = async (req: Request, res: Response) => {
  try {
    const ok = await partsService.deletePart(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Part not found' });
    res.json({ message: 'Part deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete part' });
  }
};