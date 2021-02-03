const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

class Article extends Model {}
const article = Article.init({
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
    type: DataTypes.STRING,
    allowNull: false
  },
  // 文章顶部图片
  picture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 是否审核通过，1待审核，2审核中，3审核通过，4审核不通过，审核不过前端不显示
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  // 文章类型，1草稿（不需进行审核），2发布（需进行审核）
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
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