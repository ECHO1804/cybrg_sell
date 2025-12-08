'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const cyborgId = (await queryInterface.sequelize.query('SELECT id FROM cyborgs LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('cart', [{
      id: uuidv4(),
      cyborg_id: cyborgId
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cart', null, {});
  }
};
