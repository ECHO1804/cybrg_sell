'use strict';
const cartItems = require('./cart_items.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart_items', cartItems);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart_items', null, {});
  }
};
