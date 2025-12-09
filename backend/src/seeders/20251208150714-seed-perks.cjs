'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const sellerId = (await queryInterface.sequelize.query('SELECT id FROM seller LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('perks', [{
      id: uuidv4(),
      seller_id: sellerId,
      name: 'Speed Boost',
      price: 499.99,
      image: 'speed.jpg',
      description: 'Increases movement speed by 25%'
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('perks', null, {});
  }
};
