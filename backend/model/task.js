const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

// 每次打卡的数据
class Task extends Model {}
const task = Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    // 每次打卡上传的图片（图片路径）
    taskImages: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // 完成听写
    finishWrite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    // 完成视频
    finishVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, { sequelize, modelName: 'task' })

module.exports = task