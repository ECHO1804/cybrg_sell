'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_item_attachments', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      cart_item_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'cart_items', key: 'id' } },
      attachment_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'attachments', key: 'id' } }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('cart_item_attachments');
  }
};
