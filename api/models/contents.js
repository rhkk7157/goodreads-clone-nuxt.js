'use strict'
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define(
    'Contents',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_idx: {
        type: DataTypes.BIGINT
      },
      post_idx: {
        type: DataTypes.BIGINT
      },
      original_name: {
        type: DataTypes.STRING(255)
      },
      fileName: {
        type: DataTypes.STRING(255)
      },
      filePath: {
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'contents',
      timestamps: false
    }
  )

  return Contents
}
