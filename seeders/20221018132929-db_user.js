'use strict';

let data = require("../db.json")
let bcrypt = require("bcryptjs")

const hashingPassword = pass => bcrypt.hashSync(pass,10)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   data.forEach( e => {
    e.password = hashingPassword(e.password)
    e.createdAt = new Date()
    e.updatedAt = new Date()
   })

   await queryInterface.bulkInsert("Users", data, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
