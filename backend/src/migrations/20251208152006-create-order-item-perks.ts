'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_item_perks', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      order_item_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'order_items', key: 'id' } },
      perk_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'perks', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('order_item_perks');
  }
};
