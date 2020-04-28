'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.STRING(45)
      },
      username: {
        type: DataTypes.STRING(45)
      },
      password: {
        type: DataTypes.STRING(255)
      },
      salt: {
        type: DataTypes.STRING(45)
      },
      profile_Img: {
        type: DataTypes.STRING(250)
      },
      address: {
        type: DataTypes.STRING(45)
      },
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      tableName: 'user',
      timestamps: false
    }
  )

  return User
}
