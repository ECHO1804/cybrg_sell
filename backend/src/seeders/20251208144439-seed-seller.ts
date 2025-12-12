'use strict';
const sellers = require('./seller.ts')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('seller', sellers);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('seller', null, {});
  }
};
