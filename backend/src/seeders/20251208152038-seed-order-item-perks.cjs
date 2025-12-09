'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const orderItemId = (await queryInterface.sequelize.query('SELECT id FROM order_items LIMIT 1', { plain: true })).id;
    const perkId = (await queryInterface.sequelize.query('SELECT id FROM perks LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('order_item_perks', [{
      id: uuidv4(),
      order_item_id: orderItemId,
      perk_id: perkId
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('order_item_perks', null, {});
  }
};
