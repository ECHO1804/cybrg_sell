'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const partId = (await queryInterface.sequelize.query('SELECT id FROM parts LIMIT 1', { plain: true })).id;
    const attachmentId = (await queryInterface.sequelize.query('SELECT id FROM attachments LIMIT 1', { plain: true })).id;
    await queryInterface.bulkInsert('part_attachments', [{
      id: uuidv4(),
      part_id: partId,
      attachment_id: attachmentId
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('part_attachments', null, {});
  }
};
