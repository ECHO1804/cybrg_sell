import type { Request, Response } from 'express';
import { registerUser, loginUser, getUserById } from '../services/auth.services';
import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.services';
import { signToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters' 
      });
    }

    const { data, error } = await registerUser({
      email,
      password,
      firstName,
      lastName,
      phone
    });

    if (error) {
      return res.status(400).json(error);
    }

    // Generate token
    const token = signToken({ 
      id: data!.id, 
      email: data!.email 
    });

    return res.status(201).json({ 
      message: 'Registration successful',
      user: data,
      token 
    });
  } catch (err) {
    return res.status(500).json({ 
      message: 'Registration failed' 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const { data, error } = await loginUser(email);

    if (error || !data) {
      return res.status(400).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, data.password);

    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = signToken({ 
      id: data.id, 
      email: data.email 
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = data;

    return res.json({ 
      message: 'Login successful',
      user: userWithoutPassword,
      token 
    });
  } catch (err) {
    return res.status(500).json({ 
      message: 'Login failed' 
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ 
        message: 'Unauthorized' 
      });
    }

    const { data, error } = await getUserById(userId);

    if (error || !data) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

  res.json({ message: "Login success", token });
};
