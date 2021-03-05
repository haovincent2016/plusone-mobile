const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

const user = require('./user')

// 试卷数据
class Test extends Model {}
const test = Test.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    // 试卷名
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 完成时间（默认90分钟）
    timelimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 90
    },
    // 截止时间
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // 问题
    questions: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize, modelName: 'test' })

// 一张试卷对应多个学生
// 一个学生对应多张试卷
// user.belongsToMany(test, {
//     through: 'test_user'
// })
// test.belongsToMany(user, {
//     through: 'test_user'
// })

module.exports = test