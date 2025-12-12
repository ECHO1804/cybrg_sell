import { useState, useEffect } from 'react';

const mockAttachments = [
  { id: 1, name: 'Laser Emitter', price: 200, description: 'Integrated energy weapon' },
  { id: 2, name: 'Shield Projector', price: 150, description: 'Energy shield deployment' },
  { id: 3, name: 'Sensor Array', price: 300, description: '360° environmental scanning' },
  { id: 4, name: 'Hydraulic Grip', price: 150, description: 'Enhanced lifting capacity' },
  { id: 5, name: 'Toolkit Integration', price: 180, description: 'Multi-tool system' },
];

export const usePartAttachments = (partId?: string) => {
  const [attachments, setAttachments] = useState(mockAttachments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAttachments(mockAttachments);
      setLoading(false);
    }, 200);
  }, [partId]);

  return { attachments, loading, error: null };
};

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const usePartAttachments = (partId?: string) => {
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchAttachments = useCallback(async (id?: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // TO DO: Pag may endpoint na, use: `${BASE_URL}/parts/${id}/attachments`
//       // For now, fetch all attachments
//       const response = await axios.get(`${BASE_URL}/attachments`);
      

//       setAttachments(response.data);
//     } catch (err: any) {
//       console.error('Error fetching attachments:', err);
      
//       // Fallback to mock data API fails
//       const mockAttachments: Attachment[] = [
//         { id: 1, name: 'Laser Emitter', price: 200, description: 'Integrated energy weapon', category: 'Weapon' },
//         { id: 2, name: 'Hydraulic Grip', price: 150, description: 'Enhanced lifting capacity', category: 'Utility' },
//         { id: 3, name: 'Sensor Array', price: 300, description: '360° environmental scanning', category: 'Sensor' },
//         { id: 4, name: 'Shield Projector', price: 400, description: 'Energy shield deployment', category: 'Defense' },
//         { id: 5, name: 'Toolkit Integration', price: 180, description: 'Multi-tool system', category: 'Utility' }
//       ];
      
//       setAttachments(mockAttachments);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAttachments(partId);
//   }, [partId, fetchAttachments]);

//   return { attachments, loading, error };
// };