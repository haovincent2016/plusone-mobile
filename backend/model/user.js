module.exports = function(sequelize,DataTypes){
  return sequelize.define(
    'user',
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
      phone:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone'
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      }
    },
    {
      timestamps: false
    }
  );
}