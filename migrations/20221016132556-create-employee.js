'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "Users"
        }
      },
      joinDate: {
        type: Sequelize.DATE,
        allowNull : false
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull : false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull : false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull : false
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
    await queryInterface.dropTable('Employees');
  }
};