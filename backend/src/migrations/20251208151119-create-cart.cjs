'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      cyborg_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'cyborgs', key: 'id' } },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('now()') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cart');
  }
};
