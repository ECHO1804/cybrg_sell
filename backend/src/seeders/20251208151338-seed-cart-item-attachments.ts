'use strict';
const cartItemAttachments = require('./cart_item_attachments.ts');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart_item_attachments', cartItemAttachments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart_item_attachments', null, {});
  }
};
