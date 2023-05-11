'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
    users.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
