const { v4: uuidv4 } = require('uuid');

const parts = [
  {
    id: uuidv4(),
    seller_id: '225f5ee0-47e6-4590-b700-7c7e57b3ef1f', // ← Use the REAL seller ID from your DB
    name: 'Sick Gun',
    category: 'arm',
    price: 2999.99,
    image: 'arm1.jpg',
    description: 'High strength cybernetic arm'
  }
];

module.exports = parts;
