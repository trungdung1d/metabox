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
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    date: DataTypes.DATE,
    gender:DataTypes.STRING,
    phone:DataTypes.STRING,
    address:DataTypes.STRING,
    identification:{
      type: DataTypes.STRING,
      unique: true
    },
    image:DataTypes.STRING,
    image1st:DataTypes.STRING,
    image2nd:DataTypes.STRING,
    role:DataTypes.STRING,
    position:DataTypes.STRING,
    score:DataTypes.INTEGER,
    rank:DataTypes.STRING,
    verified:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};