const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

class Article extends Model {}
const article = Article.init({
  articleid: {
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
    type: DataTypes.STRING,
    allowNull: false
  },
  // 文章顶部图片
  picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 是否审核通过，默认没有，审核不过不显示
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // 浏览数
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 点赞数
  like: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, { sequelize, modelName: 'article' })

// 评论功能暂不开发
// 标签功能暂不开发

module.exports = article