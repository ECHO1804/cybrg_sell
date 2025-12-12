import { useState, useEffect } from 'react';

const mockPerks = [
  { id: 1, name: 'Speed Boost', price: 100, description: '+25% movement speed' },
  { id: 2, name: 'Durability+', price: 150, description: 'Enhanced structural integrity' },
  { id: 3, name: 'Energy Efficiency', price: 120, description: '-30% power consumption' },
  { id: 4, name: 'Stealth Coating', price: 200, description: 'Reduced thermal signature' },
];

export const usePartPerks = (partId?: string) => {
  const [perks, setPerks] = useState(mockPerks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPerks(mockPerks);
      setLoading(false);
    }, 200);
  }, [partId]);

  return { perks, loading, error: null };
};

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const usePartPerks = (partId?: string) => {
//   const [perks, setPerks] = useState<Perk[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchPerks = useCallback(async (id?: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${BASE_URL}/perks`);
      

//       setPerks(response.data);
//     } catch (err: any) {
//       console.error('Error fetching perks:', err);
      
//       // mock data
//       const mockPerks: Perk[] = [
//         { id: 1, name: 'Speed Boost', price: 100, description: '+25% movement speed', tier: 'Common' },
//         { id: 2, name: 'Durability+', price: 150, description: 'Enhanced structural integrity', tier: 'Rare' },
//         { id: 3, name: 'Energy Efficiency', price: 120, description: '-30% power consumption', tier: 'Common' },
//         { id: 4, name: 'Stealth Coating', price: 200, description: 'Reduced thermal signature', tier: 'Epic' }
//       ];
      
//       setPerks(mockPerks);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPerks(partId);
//   }, [partId, fetchPerks]);

//   return { perks, loading, error };
// };