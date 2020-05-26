const crypto = require('crypto')
const models = require('../models')

const commentInsert = (params) => {
  params = params || {}
  const CommentPassword = params.password
  const salt = Math.round(new Date().valueOf() * Math.random()) + ''

  const hashPassword = crypto
    .createHash('sha256')
    .update(CommentPassword + salt)
    .digest('hex')

  return models.Comments.create({
    user_idx: params.userIdx,
    password: hashPassword,
    salt,
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
  const likesStatus = params.likesStatus

  // likes_status 1 : 좋아요, 2: 싫어요
  return models.CommentsLikes.create({
    comment_idx: commentIdx,
    user_idx: userIdx,
    likes_status: likesStatus
  }).then((likesComments) => {
    // return likesComments
    return models.CommentsLikes.findAndCountAll({
      where: {
        comment_idx: commentIdx,
        likes_status: likesStatus
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

const dislikeComments = (params) => {
  const commentIdx = params.commentIdx
  const userIdx = params.userIdx
  const likesStatus = params.likesStatus

  // likes_status 1 : 좋아요, 2: 싫어요
  return models.CommentsLikes.create({
    comment_idx: commentIdx,
    user_idx: userIdx,
    likes_status: likesStatus
  }).then((likesComments) => {
    // return likesComments
    return models.CommentsLikes.findAndCountAll({
      where: {
        comment_idx: commentIdx,
        likes_status: likesStatus
      }
    }).then((res) => {
      const commentLikesCount = res.count
      return models.Comments.update(
        { dislikes: commentLikesCount },
        { where: { idx: commentIdx } }
      ).then((updateCommentdisLikes) => {
        return res
      })
    })
  })
}

const commentUpdate = (params) => {
  const commentUserIdx = params.userIdx

  return models.Comments.update({})
}

module.exports = {
  commentInsert,
  commentPaging,
  likeComments,
  dislikeComments,
  commentUpdate
}
