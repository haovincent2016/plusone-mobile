const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

const collection = require('./collection')
const article = require('./article')
const task = require('./task')

class User extends Model {}
const user = User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  },
  //用户名不可重复
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '/static/img/avatar.jpg'
  },
  // 账号类型, admin可以进入后台管理
  type: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    allowNull: false,
    defaultValue: 'user'
  },
  // 账号状态, 被封的账户(false)不允许使用网站功能
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  // 打卡积分
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 总打卡天数
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 一周打卡天数（每周更新数据）
  // days: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     defaultValue: 0
  // },
  // 历史打卡数据（日期）
  // records: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // 非必填项
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '什么也没有~'
  }


}, { sequelize, modelName: 'user' })

// one to many默认ON DELETE SET NULL ON UPDATE CASCADE

// 一个用户拥有多个收藏夹
user.hasMany(collection, {
  foreignKey: {
    name: 'ownerId',
    allowNull: true
  }
})
collection.belongsTo(user, {
  foreignKey: {
    name: 'ownerId',
    allowNull: true
  }
})

// 一个用户拥有多个文章
user.hasMany(article, {
  foreignKey: {
    name: 'authorId',
    allowNull: true
  }
})
article.belongsTo(user, {
  foreignKey: {
    name: 'authorId',
    allowNull: true
  }
})

// 一个用户拥有多条打卡记录
user.hasMany(task, {
  foreignKey: {
    name: 'userId',
    allowNull: true
  }
})
task.belongsTo(user, {
  foreignKey: {
    name: 'userId',
    allowNull: true
  }
})

module.exports = user