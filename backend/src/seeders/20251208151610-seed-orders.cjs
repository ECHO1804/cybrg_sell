'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const cyborgId = (await queryInterface.sequelize.query('SELECT id FROM cyborgs LIMIT 1', { plain: true })).id;
    const sellerId = (await queryInterface.sequelize.query('SELECT id FROM seller LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('orders', [{
      id: uuidv4(),
      cyborg_id: cyborgId,
      seller_id: sellerId,
      total_price: 5999.99,
      status: 'pending',
      created_at: new Date()
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
