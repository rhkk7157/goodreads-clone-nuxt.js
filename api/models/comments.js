'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_idx: {
        type: DataTypes.BIGINT
      },
      password: {
        type: DataTypes.STRING(255)
      },
      content: {
        type: DataTypes.STRING(255)
      },
      likes: {
        type: DataTypes.STRING(250)
      },
      created_at: {
        type: DataTypes.TIME
      },
      post_idx: {
        type: DataTypes.BIGINT
      }
    },
    {
      tableName: 'comments',
      timestamps: false
    }
  )

  return Comments
}
