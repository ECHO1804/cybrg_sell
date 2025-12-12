'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('part_perks', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      part_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'parts', key: 'id' } },
      perk_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'perks', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('part_perks');
  }
};
