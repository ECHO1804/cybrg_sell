import { supabase } from '../config/supabase';

export const getAllSellers = async () => {
  return await supabase.from('Seller').select('*');
};

export const createSeller = async (data: any) => {
  return await supabase.from('Seller').insert([data]).select().single();
};

export const deleteSeller = async (id: number) => {
  return await supabase.from('Seller').delete().eq('id', id);
};
