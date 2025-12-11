'use strict';
const orderItemAttachments = require('./order_items_attachments.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_item_attachments', orderItemAttachments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_item_attachments', null, {});
  }
};
