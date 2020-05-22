const models = require('../models')

const commentInsert = (params) => {
  params = params || {}

  return models.Comments.create({
    user_idx: params.userIdx,
    password: params.postPassword,
    content: params.comment,
    post_idx: params.postIdx
  }).then((comments) => {
    return comments
  })
}

const commentPaging = (params) => {
  params = params || {}

  return models.Comments.findAndCountAll({
    where: {
      post_idx: params.postIdx
    },
    offset: params.offset || 0,
    limit: params.limit || 12,
    order: [['idx', 'desc']],
    raw: true,
    attributes: {
      include: [
        [models.Sequelize.col('User.user_id'), 'user_id'],
        [models.Sequelize.col('User.username'), 'user_name']
      ]
    },
    include: [
      {
        model: models.User,
        required: true,
        attributes: []
      }
    ]
  }).then((commentsPaging) => {
    return commentsPaging
  })
}

const likeComments = (params) => {
  const commentIdx = params.commentIdx
  const userIdx = params.userIdx

  return models.CommentsLikes.create({
    comment_idx: commentIdx,
    user_idx: userIdx
  }).then((likesComments) => {
    // return likesComments
    return models.CommentsLikes.findAndCountAll({
      where: {
        comment_idx: commentIdx
      }
    }).then((res) => {
      const commentLikesCount = res.count
      return models.Comments.update(
        { likes: commentLikesCount },
        { where: { idx: commentIdx } }
      ).then((updateCommentLikes) => {
        return res
      })
    })
  })
}

module.exports = {
  commentInsert,
  commentPaging,
  likeComments
}
