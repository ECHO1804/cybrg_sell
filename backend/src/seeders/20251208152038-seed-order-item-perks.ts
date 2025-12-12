'use strict';
const orderItemPerks = require('./order_item_perks.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_item_perks', orderItemPerks);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_item_perks', null, {});
  }
};
