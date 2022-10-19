'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Queue.belongsTo(models.User)
    }
  }
  Queue.init({
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : { msg : "UserID is required"},
        notNull : { msg : "UserID is required"}
      },
      references : {
        model : "Users"
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Queue',
  });
  return Queue;
};