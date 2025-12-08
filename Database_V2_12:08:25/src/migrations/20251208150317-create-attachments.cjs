'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      seller_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'seller', key: 'id' } },
      name: { type: Sequelize.TEXT, allowNull: false },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      image: { type: Sequelize.TEXT },
      description: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('now()') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('attachments');
  }
};
