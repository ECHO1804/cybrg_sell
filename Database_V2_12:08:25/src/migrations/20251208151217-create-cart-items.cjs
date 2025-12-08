'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_items', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      cart_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'cart', key: 'id' } },
      part_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'parts', key: 'id' } },
      total_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cart_items');
  }
};
