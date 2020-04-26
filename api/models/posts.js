'use strict'
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_idx: {
        type: DataTypes.BIGINT
      },
      title: {
        type: DataTypes.STRING(45)
      },
      sub_title: {
        type: DataTypes.STRING(45)
      },
      content: {
        type: DataTypes.STRING(255)
      },
      views: {
        type: DataTypes.BIGINT
      },
      likes: {
        type: DataTypes.BIGINT
      },
      comments: {
        type: DataTypes.BIGINT
      },
      category: {
        type: DataTypes.STRING(45)
      },
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      tableName: 'posts',
      timestamps: false
    }
  )
  Posts.associate = function(models) {
    Posts.belongsTo(models.User, {
      foreignKey: 'user_idx'
    })
  }
  return Posts
}
