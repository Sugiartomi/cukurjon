'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusMember: {
        type: Sequelize.BOOLEAN,
        allowNull : false
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull : false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull : false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull : false
      },
      sumCukur: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Users"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};