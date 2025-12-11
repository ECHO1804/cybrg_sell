// seeders/cartItemPerks.js
'use strict';
const cartItemPerks = require('./cart_item_perks.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart_item_perks', cartItemPerks);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart_item_perks', null, {});
  }
};
