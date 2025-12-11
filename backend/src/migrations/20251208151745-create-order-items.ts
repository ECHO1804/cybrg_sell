'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      order_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'orders', key: 'id' } },
      part_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'parts', key: 'id' } },
      subtotal: { type: Sequelize.DECIMAL(10,2), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('order_items');
  }
};
