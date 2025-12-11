import type { Request, Response } from 'express';
import { getAllSellers, createSeller, deleteSeller } from '../services/seller.service';

export const getSellers = async (req: Request, res: Response) => {
  const { data, error } = await getAllSellers();
  if (error) return res.status(500).json(error);
  res.json(data);
};

export const addSeller = async (req: Request, res: Response) => {
  const { data, error } = await createSeller(req.body);
  if (error) return res.status(500).json(error);
  res.json(data);
};

export const removeSeller = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { error } = await deleteSeller(id);

  if (error) return res.status(500).json(error);

  res.json({ message: "Seller deleted" });
};
