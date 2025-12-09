'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const orderId = (await queryInterface.sequelize.query('SELECT id FROM orders LIMIT 1', { plain: true })).id;
    const partId = (await queryInterface.sequelize.query('SELECT id FROM parts LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('order_items', [{
      id: uuidv4(),
      order_id: orderId,
      part_id: partId,
      subtotal: 2999.99
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('order_items', null, {});
  }
};
