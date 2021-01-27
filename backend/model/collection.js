const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

const article = require('./article')

class Collection extends Model {}
const collection = Collection.init({
  collectionid:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  },
  // 收藏夹名
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 收藏夹描述（非必填）
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '请填写你的收藏夹描述吧~'
  },
  // 是否公开（默认公开），私有别人不可看
  public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
  }
}, { sequelize, modelName: 'collection' })

// 一个收藏夹包含多个文章
collection.hasMany(article, {
  foreignKey: {
    name: 'colId',
    allowNull: true
  }
})
article.belongsTo(collection)

module.exports = collection