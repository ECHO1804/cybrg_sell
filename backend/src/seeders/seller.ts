const { v4: uuidv4 } = require('uuid');

const sellers = [
  {
    id: uuidv4(),
    email: 'Zyonix.com',
    password: 'password123', // hash this in real apps
    name: 'Cyborg Shop Admin',
    created_at: new Date(),
  }
];

module.exports = sellers;
