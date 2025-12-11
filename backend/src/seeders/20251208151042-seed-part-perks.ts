'use strict';
const partPerks = require('./part_perks.ts')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_perks', partPerks);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_perks', null, {});
  }
};
