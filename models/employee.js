'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.User)
    }
  }
  Employee.init({
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : { msg : "UserId is required"},
        notNull : { msg : "UserId is required"}
      },
      references : {
        model : "Users"
      }
    },
    joinDate: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Join Date is required"},
        notNull : { msg : "Join Date is required"}
      }
    },
    salary: {
      type : DataTypes.INTEGER,
      allowNull : true
    },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Phone Number is required"},
        notNull : { msg : "Phone Number is required"}
      }
    },
    firstName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg : "First Name is required"},
        notNull : { msg : "First Name is required"}
      }
    },
    lastname: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Last Name is required"},
        notNull : { msg : "Last Name is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};