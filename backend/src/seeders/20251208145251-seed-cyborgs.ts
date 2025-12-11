'use strict';
const cyborgs = require('./cyborgs.ts')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cyborgs', cyborgs);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cyborgs', null, {});
  }
};
