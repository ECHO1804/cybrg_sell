import { Router } from 'express';
import { supabase } from '../config/supabase';


const router = Router();

// Test Supabase connection
router.get('/db', async (req, res) => {
  const { data, error } = await supabase.from('Seller').select('*').limit(1);

  if (error) {
    return res.status(500).json({ message: 'Supabase connection FAILED', error });
  }

  return res.json({
    message: 'Supabase connection SUCCESS',
    exampleData: data
  });
});

export default router;
