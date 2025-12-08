'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const sellerId = (await queryInterface.sequelize.query('SELECT id FROM seller LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('parts', [{
      id: uuidv4(),
      seller_id: sellerId,
      name: 'Wicked MK1',
      category: 'arm',
      price: 2999.99,
      image: 'arm1.jpg',
      description: 'High strength cybernetic arm'
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('parts', null, {});
  }
};
