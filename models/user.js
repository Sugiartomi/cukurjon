'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Queue, { foreignKey : 'UserId' })
      User.hasMany(models.Employee, { foreignKey : 'UserId' })
      User.hasMany(models.Customer, { foreignKey : 'UserId' })
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : { msg : "Incorrect Email format"},
        notNull : { msg : "Email is required"},
        notEmpty : { msg : "Email is required"}
      }
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : { msg : "Username is required"},
        notEmpty : { msg : "Username is required"}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg : "Password is required"},
        notNull : { msg : "Password is required"}
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : { msg : "Role is required"},
        notEmpty : { msg : "Role is required"}
      }
    }
  }, {
    hooks : {
      beforeCreate(inst, opt) {
        const bcrypt = require('bcryptjs')
        const hashing = pass => bcrypt.hashSync(pass, 10)
        inst.password = hashing(inst.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};