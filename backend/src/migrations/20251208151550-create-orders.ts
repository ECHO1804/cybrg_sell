'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      cyborg_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'cyborgs', key: 'id' } },
      seller_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'seller', key: 'id' } },
      total_price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      status: { 
        type: Sequelize.ENUM('pending', 'completed', 'cancelled'), 
        defaultValue: 'pending',
        allowNull: false 
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('now()') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  }
};
