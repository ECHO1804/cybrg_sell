import { useState, useEffect, useCallback } from 'react';


const mockParts = [
  { id: '1', name: 'Quantum Arm', category: 'Arm', price: '$2,500', maxAttachments: 3, maxPerks: 2, description: 'Advanced neural-controlled arm' },
  { id: '2', name: 'Titanium Leg', category: 'Leg', price: '$2,200', maxAttachments: 3, maxPerks: 2, description: 'Enhanced mobility leg system' },
  { id: '3', name: 'Carbon Fiber Torso', category: 'Torso', price: '$3,200', maxAttachments: 3, maxPerks: 2, description: 'Lightweight armored torso' },
  { id: '4', name: 'Neural Processor', category: 'Organ', price: '$1,850', maxAttachments: 2, maxPerks: 1, description: 'Brain-computer interface processor' },
  { id: '5', name: 'Holo-Vision Eye', category: 'Organ', price: '$1,500', maxAttachments: 2, maxPerks: 1, description: 'Augmented reality vision system' },
  { id: '6', name: 'Hydraulic Arm', category: 'Arm', price: '$2,200', maxAttachments: 3, maxPerks: 2, description: 'Industrial strength arm' },
  { id: '7', name: 'Synthetic Heart', category: 'Organ', price: '$4,200', maxAttachments: 2, maxPerks: 2, description: 'Self-regulating power source' },
  { id: '8', name: 'Sensor Array', category: 'Organ', price: '$2,800', maxAttachments: 2, maxPerks: 1, description: '360-degree environmental scanner' },
  { id: '9', name: 'Processing Core', category: 'Organ', price: '$3,600', maxAttachments: 2, maxPerks: 2, description: 'High-speed computing unit' },
  { id: '10', name: 'Power Cell', category: 'Organ', price: '$1,950', maxAttachments: 1, maxPerks: 2, description: 'High-capacity energy storage' },
  { id: '11', name: 'Armored Torso', category: 'Torso', price: '$4,100', maxAttachments: 3, maxPerks: 1, description: 'Reinforced defensive torso' },
  { id: '12', name: 'Mobility Boost', category: 'Leg', price: '$1,700', maxAttachments: 2, maxPerks: 2, description: 'Enhanced movement system' },
  { id: '13', name: 'Stealth Arm', category: 'Arm', price: '$3,300', maxAttachments: 3, maxPerks: 1, description: 'Stealth-enhanced arm system' },
];

export const useParts = () => {
  const [parts, setParts] = useState(mockParts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParts = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setParts(mockParts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  const refetch = () => {
    fetchParts();
  };

  return { parts, loading, error, refetch };
};

export const useFilteredParts = (
  selectedCategory: string,
  searchQuery: string,
  itemsPerPage: number,
  currentPage: number
) => {
  const { parts, loading } = useParts();

  const filteredParts = parts.filter(part => {
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParts = filteredParts.slice(startIndex, startIndex + itemsPerPage);

  return {
    filteredParts,
    currentParts,
    totalPages,
    totalItems: filteredParts.length,
    loading,
    error: null
  };
};

export const useCategories = () => {
  const { parts, loading } = useParts();
  
  const categories = parts.length > 0 
    ? ['All', ...new Set(parts.map(part => part.category))] 
    : ['All'];

  return { categories, loading, error: null };
};

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const useParts = () => {
//   const [parts, setParts] = useState<Part[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchParts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BASE_URL}/parts`);
      
//       const transformedParts = response.data.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         category: p.category,
//         description: p.description,
//         price: `$${p.base_price || 0}`, 
//         maxAttachments: p.available_attachments_slot || 0,
//         maxPerks: p.available_perks_slot || 0,
//         image: p.image || p.images?.[0]
//       }));
//       setParts(transformedParts);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch parts');
//       console.error('Error fetching parts:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchParts();
//   }, [fetchParts]);

//   return { parts, loading, error, refetch: fetchParts };
// };
