const { v4: uuidv4 } = require('uuid');

const cyborgs = [
  {
    id: uuidv4(),
    email: 'Emilie.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Test Cyborg Customer',
    created_at: new Date()
  }
];

module.exports = cyborgs;
