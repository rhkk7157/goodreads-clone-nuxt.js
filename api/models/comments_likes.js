'use strict'
module.exports = (sequelize, DataTypes) => {
  const CommentsLikes = sequelize.define(
    'CommentsLikes',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_idx: {
        type: DataTypes.BIGINT
      },
      comment_idx: {
        type: DataTypes.BIGINT
      },
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      tableName: 'comments_likes',
      timestamps: false
    }
  )

  return CommentsLikes
}
