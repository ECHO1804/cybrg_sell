import { supabase } from '../config/supabase';
import bcrypt from 'bcryptjs';

export const registerUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  return await supabase
    .from('Users')
    .insert([{ email, password: hashed }])
    .select()
    .single();
};

export const loginUser = async (email: string) => {
  return await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .single();
};
