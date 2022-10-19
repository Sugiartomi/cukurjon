'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User)
    }
  }
  Customer.init({
    statusMember: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Status Member is required"},
        notNull : { msg : "Status Member is required"}
      }
    },
    firstname: {
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
    },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Phone Number is required"},
        notNull : { msg : "Phone Number is required"}
      }
    },
    sumCukur: {
      type :  DataTypes.INTEGER,
    },
    UserId: {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : { msg : "User ID is required"},
        notNull : { msg : "User ID is required"}
      },
      references : {
        model : "Users"
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};