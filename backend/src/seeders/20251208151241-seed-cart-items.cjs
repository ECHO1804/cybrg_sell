'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const cartId = (await queryInterface.sequelize.query('SELECT id FROM cart LIMIT 1', { plain: true })).id;
    const partId = (await queryInterface.sequelize.query('SELECT id FROM parts LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('cart_items', [{
      id: uuidv4(),
      cart_id: cartId,
      part_id: partId,
      total_price: 2999.99
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cart_items', null, {});
  }
};
