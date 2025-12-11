'use strict';
const perks = require('./perks.ts')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('perks', perks);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('perks', null, {});
  }
};
