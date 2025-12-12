import { useState, useEffect, useCallback } from 'react';

const mockParts = [
  { id: '1', name: 'Quantum Arm', category: 'Arm', price: 2500, description: 'Advanced neural-controlled arm', longDescription: 'This cutting-edge cybernetic arm integrates seamlessly with neural interfaces, providing unprecedented control and sensory feedback. Equipped with self-repairing nano-muscle fibers and quantum computing processors for real-time adaptation.', maxAttachments: 3, maxPerks: 2 },
  { id: '2', name: 'Titanium Leg', category: 'Leg', price: 2200, description: 'Enhanced mobility leg system', longDescription: 'High-strength titanium construction with hydraulic actuators. Features adaptive joint systems and impact-dampening technology for smooth movement across all terrains.', maxAttachments: 3, maxPerks: 2 },
  { id: '3', name: 'Carbon Fiber Torso', category: 'Torso', price: 3200, description: 'Lightweight armored torso', longDescription: 'Carbon fiber composite structure with impact-absorbing gel. Includes integrated cooling systems and modular attachment points for various cybernetic enhancements.', maxAttachments: 3, maxPerks: 2 },
  { id: '4', name: 'Neural Processor', category: 'Organ', price: 1850, description: 'Brain-computer interface processor', longDescription: 'Quantum computing neural processor with adaptive learning algorithms. Enhances cognitive functions and provides direct neural interface with other cybernetics.', maxAttachments: 2, maxPerks: 1 },
  { id: '5', name: 'Holo-Vision Eye', category: 'Organ', price: 1500, description: 'Augmented reality vision system', longDescription: 'High-resolution holographic display with night vision, thermal imaging, and telescopic zoom capabilities. Features real-time data overlay and target tracking.', maxAttachments: 2, maxPerks: 1 },
  { id: '6', name: 'Hydraulic Arm', category: 'Arm', price: 2200, description: 'Industrial strength arm', longDescription: 'Heavy-duty hydraulic system with reinforced actuators. Capable of lifting up to 2000kg and features precision grip control for delicate operations.', maxAttachments: 3, maxPerks: 2 },
  { id: '7', name: 'Synthetic Heart', category: 'Organ', price: 4200, description: 'Self-regulating power source', longDescription: 'Advanced synthetic organ that regulates power distribution to all cybernetic systems. Features emergency power reserves and self-repairing nano-cells.', maxAttachments: 2, maxPerks: 2 },
  { id: '8', name: 'Sensor Array', category: 'Organ', price: 2800, description: '360-degree environmental scanner', longDescription: 'Comprehensive sensor suite providing 360° environmental awareness. Includes radar, sonar, thermal, and electromagnetic spectrum scanning capabilities.', maxAttachments: 2, maxPerks: 1 },
  { id: '9', name: 'Processing Core', category: 'Organ', price: 3600, description: 'High-speed computing unit', longDescription: 'Quantum processing core with multi-threaded neural networking. Accelerates all cognitive and cybernetic functions by up to 500%.', maxAttachments: 2, maxPerks: 2 },
  { id: '10', name: 'Power Cell', category: 'Organ', price: 1950, description: 'High-capacity energy storage', longDescription: 'Advanced power cell with rapid-charging capabilities and extended operational life. Provides stable power supply to all cybernetic systems.', maxAttachments: 1, maxPerks: 2 },
  { id: '11', name: 'Armored Torso', category: 'Torso', price: 4100, description: 'Reinforced defensive torso', longDescription: 'Heavily armored torso plating with energy shield integration. Designed for maximum protection in hostile environments.', maxAttachments: 3, maxPerks: 1 },
  { id: '12', name: 'Mobility Boost', category: 'Leg', price: 1700, description: 'Enhanced movement system', longDescription: 'Specialized leg enhancement providing increased speed, agility, and jumping capabilities. Perfect for rapid deployment scenarios.', maxAttachments: 2, maxPerks: 2 },
  { id: '13', name: 'Stealth Arm', category: 'Arm', price: 3300, description: 'Stealth-enhanced arm system', longDescription: 'Designed for covert operations with radar-absorbing materials and silent actuators. Features integrated stealth field generator.', maxAttachments: 3, maxPerks: 1 },
];

export const usePart = (partId?: string) => {
  const [part, setPart] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPart = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    //for delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find by id
    const foundPart = mockParts.find(p => p.id === id);
    
    if (!foundPart) {
      setError(`Part with ID ${id} not found`);
      setLoading(false);
      return;
    }
    
    setPart(foundPart);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (partId) {
      fetchPart(partId);
    }
  }, [partId, fetchPart]);

  const refetch = () => {
    if (partId) {
      fetchPart(partId);
    }
  };

  return { part, loading, error, refetch };
};

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const usePart = (partId?: string) => {
//   const [part, setPart] = useState<Part | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchPart = useCallback(async (id: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${BASE_URL}/parts/${id}`);
//       const transformedPart: Part = {
//         id: response.data.id,
//         name: response.data.name,
//         category: response.data.category,
//         price: response.data.base_price || response.data.price || 0,
//         description: response.data.description || '',
//         longDescription: response.data.long_description || response.data.description || '',
//         maxAttachments: response.data.available_attachments_slot || 3,
//         maxPerks: response.data.available_perks_slot || 2
//       };
//       setPart(transformedPart);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch part');
//       console.error('Error fetching part:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (partId) {
//       fetchPart(partId);
//     }
//   }, [partId, fetchPart]);

//   const refetch = () => {
//     if (partId) {
//       fetchPart(partId);
//     }
//   };

//   return { part, loading, error, refetch };
// };