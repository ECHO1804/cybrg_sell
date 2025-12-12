'use strict';
const attachments = require('./attachments.ts')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('attachments', attachments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('attachments', null, {});
  }
};
