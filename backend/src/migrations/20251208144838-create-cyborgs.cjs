'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cyborgs', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      email: { type: Sequelize.TEXT, allowNull: false, unique: true },
      password: { type: Sequelize.TEXT, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('now()') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cyborgs');
  }
};
