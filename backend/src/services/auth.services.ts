import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/users.json');

type User = {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  created_at: string;
};

const readUsers = (): User[] => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
};

const writeUsers = (users: User[]) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => {
  try {
    const users = readUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { 
        data: null, 
        error: { message: 'User with this email already exists' } 
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return { data: userWithoutPassword, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: { message: 'Registration failed' } 
    };
  }
};

export const loginUser = async (email: string) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { data: null, error: { message: 'User not found' } };
    }

    return { data: user, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: { message: 'Login failed' } 
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return { data: null, error: { message: 'User not found' } };
    }

    const { password, ...userWithoutPassword } = user;
    return { data: userWithoutPassword, error: null };
  } catch (error) {
    return { 
      data: null, 
      error: { message: 'Failed to get user' } 
    };
  }
};