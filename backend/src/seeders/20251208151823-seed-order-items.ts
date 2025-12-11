'use strict';
const orderItems = require('./order_items.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_items', orderItems);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_items', null, {});
  }
};
