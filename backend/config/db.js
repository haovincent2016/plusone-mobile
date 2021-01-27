const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('plusone','root','aoyou123',{
  host:'localhost',
  dialect:'mysql',
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'  //东八时区
});

module.exports = {
  sequelize
};