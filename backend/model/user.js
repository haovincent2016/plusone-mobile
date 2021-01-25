const { DataTypes } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

const user = sequelize.define('user',
  {
    userid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    // phone:{
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   field: 'phone'
    // },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    }
  }
);

module.exports = user;