'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let tags = JSON.parse(fs.readFileSync('./data/tags.json', 'utf-8'))
    tags.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Tags', tags, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
