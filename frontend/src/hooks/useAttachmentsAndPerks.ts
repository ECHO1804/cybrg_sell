import { useState, useEffect } from 'react';

const mockAttachments = [
  { id: 1, name: 'Laser Emitter', price: 200, description: 'Integrated energy weapon', category: 'Weapon' },
  { id: 2, name: 'Shield Projector', price: 150, description: 'Energy shield deployment', category: 'Defense' },
  { id: 3, name: 'Sensor Array', price: 300, description: '360° environmental scanning', category: 'Sensor' },
  { id: 4, name: 'Hydraulic Grip', price: 150, description: 'Enhanced lifting capacity', category: 'Utility' },
  { id: 5, name: 'Toolkit Integration', price: 180, description: 'Multi-tool system', category: 'Utility' },
];

const mockPerks = [
  { id: 1, name: 'Speed Boost', price: 100, description: '+25% movement speed', tier: 'Common' },
  { id: 2, name: 'Durability+', price: 150, description: 'Enhanced structural integrity', tier: 'Rare' },
  { id: 3, name: 'Energy Efficiency', price: 120, description: '-30% power consumption', tier: 'Common' },
  { id: 4, name: 'Stealth Coating', price: 200, description: 'Reduced thermal signature', tier: 'Epic' },
];

export const useAttachmentsAndPerks = () => {
  const [attachments, setAttachments] = useState(mockAttachments);
  const [perks, setPerks] = useState(mockPerks);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setAttachments(mockAttachments);
      setPerks(mockPerks);
      setLoading(false);
    }, 200);
  }, []);

  return { attachments, perks, loading, error };
};


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const useAttachmentsAndPerks = () => {
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const [perks, setPerks] = useState<Perk[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {

//         const tempAttachments: Attachment[] = [
//           { id: 1, name: "Laser Sight", price: 200, category: "Weapon" },
//           { id: 2, name: "Shield Generator", price: 150, category: "Defense" },
//           { id: 3, name: "Night Vision", price: 300, category: "Sensor" },
//         ];
        
//         const tempPerks: Perk[] = [
//           { id: 1, name: "Speed Boost", price: 100, tier: "Common" },
//           { id: 2, name: "Durability+", price: 150, tier: "Rare" },
//           { id: 3, name: "Stealth Field", price: 250, tier: "Epic" },
//         ];
        
//         setAttachments(tempAttachments);
//         setPerks(tempPerks);
        
//         // const [attachmentsRes, perksRes] = await Promise.all([
//         //   axios.get(`${BASE_URL}/attachments`),
//         //   axios.get(`${BASE_URL}/perks`)
//         // ]);
//         // setAttachments(attachmentsRes.data);
//         // setPerks(perksRes.data);
        
//       } catch (err: any) {
//         setError(err.message || 'Failed to fetch data');
//         console.error('Error fetching attachments/perks:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { attachments, perks, loading, error };
// };