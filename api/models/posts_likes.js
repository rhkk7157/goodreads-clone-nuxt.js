'use strict'
module.exports = (sequelize, DataTypes) => {
  const PostsLikes = sequelize.define(
    'PostsLikes',
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
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      tableName: 'posts_likes',
      timestamps: false
    }
  )

  return PostsLikes
}
