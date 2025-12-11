// seeders/cart.js
'use strict';
const cart = require('./cart.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart', cart);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart', null, {});
  }
};
