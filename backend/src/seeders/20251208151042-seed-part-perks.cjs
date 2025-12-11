'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const partId = (await queryInterface.sequelize.query('SELECT id FROM parts LIMIT 1', { plain: true })).id;
    const perkId = (await queryInterface.sequelize.query('SELECT id FROM perks LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('part_perks', [{
      id: uuidv4(),
      part_id: partId,
      perk_id: perkId
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('part_perks', null, {});
  }
};
