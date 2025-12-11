import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.services';
import { signToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await registerUser(email, password);

  if (error) return res.status(400).json(error);

  return res.json({ message: "Registered successfully", data });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await loginUser(email);

  if (error || !data) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, data.password);

  if (!valid) return res.status(403).json({ message: "Wrong password" });

  const token = signToken({ id: data.id, email: data.email });

  res.json({ message: "Login success", token });
};
