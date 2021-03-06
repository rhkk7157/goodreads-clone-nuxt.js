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
      salt: {
        type: DataTypes.STRING(45)
      },
      content: {
        type: DataTypes.STRING(255)
      },
      likes: {
        type: DataTypes.BIGINT
      },
      dislikes: {
        type: DataTypes.BIGINT
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
  Comments.associate = function(models) {
    models.Comments.belongsTo(models.User, {
      foreignKey: 'user_idx'
    })
  }
  return Comments
}
