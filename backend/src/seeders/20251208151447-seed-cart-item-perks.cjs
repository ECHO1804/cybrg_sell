'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const cartItemId = (await queryInterface.sequelize.query('SELECT id FROM cart_items LIMIT 1', { plain: true })).id;
    const perkId = (await queryInterface.sequelize.query('SELECT id FROM perks LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('cart_item_perks', [{
      id: uuidv4(),
      cart_item_id: cartItemId,
      perk_id: perkId
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cart_item_perks', null, {});
  }
};
