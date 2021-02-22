const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

class Setting extends Model {}
const setting = Setting.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
    // get: function () {
    //     return JSON.parse(this.getDataValue('content'));
    // },
    // set: function (value) {
    //     this.setDataValue('content', JSON.stringify(value));
    // }
  }
}, { sequelize, modelName: 'setting' })

module.exports = setting