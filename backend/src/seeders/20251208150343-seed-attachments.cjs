'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const sellerId = (await queryInterface.sequelize.query('SELECT id FROM seller LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('attachments', [{
      id: uuidv4(),
      seller_id: sellerId,
      name: 'Dick Cannon',
      price: 899.99,
      image: 'laser.jpg',
      description: 'High-powered laser attachment'
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('attachments', null, {});
  }
};
