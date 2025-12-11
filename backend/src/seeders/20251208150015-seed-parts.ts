'use strict';
const parts = require('./parts.ts')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parts', parts);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parts', null, {});
  }
};
