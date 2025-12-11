'use strict';
const partAttachments = require('./part_attachments.ts')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('part_attachments', partAttachments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('part_attachments', null, {});
  }
};
