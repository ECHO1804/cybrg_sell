'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cyborgs', [{
      id: uuidv4(),
      email: 'Rap-El69.com',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      name: 'Test Cyborg Customer',
      created_at: new Date()
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cyborgs', { email: 'customer@cyborgshop.com' });
  }
};
