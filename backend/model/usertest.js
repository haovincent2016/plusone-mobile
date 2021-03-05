const { DataTypes, Model } = require("sequelize")

//引入db配置
const db = require('../config/db')

//引入sequelize对象
const sequelize = db.sequelize

const user = require('./user')
const test = require('./test')

// 试卷数据
class UserTests extends Model {}
const usertests = UserTests.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: 'id'
        }
    },
    testId: {
        type: DataTypes.INTEGER,
        references: {
          model: test,
          key: 'id'
        }
    },
    // 考生分数
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    // 考生答案
    answers: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { sequelize, modelName: 'usertests' })

// 一张试卷对应多个学生
// 一个学生对应多张试卷
user.belongsToMany(test, {
    through: usertests
})
test.belongsToMany(user, {
    through: usertests
})

module.exports = usertests