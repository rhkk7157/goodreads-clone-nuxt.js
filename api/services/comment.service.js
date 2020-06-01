const crypto = require('crypto')
const _ = require('lodash')
const models = require('../models')
const commentInsert = (params) => {
  // params = params || {}
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
    // post_idx로 posts 테이블 추가.
    return models.Posts.findOne({
      where: {
        idx: params.postIdx,
        user_idx: params.userIdx
      },
      raw: true
    }).then((postsComment) => {
      // 조회수 update
      const postsCommentCount = postsComment.comments
      const addCommentPostIdx = postsComment.idx
      const commentUpdated = models.Posts.update(
        { comments: postsCommentCount + 1 },
        { where: { idx: addCommentPostIdx } }
      )
      return commentUpdated
    })
  })
}

const commentPaging = (params) => {
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
    // Posts views update
    const postIdx = params.postIdx || 0
    return models.Posts.findOne({
      where: {
        idx: postIdx
      },
      raw: true
    }).then((postViews) => {
      // const views = postViews.views

      return commentsPaging
      // const views = postViews.views || 0
      // console.log(views)
      //   const updated = models.Posts.update(
      //     { views: views + 1 },
      //     { where: { idx: postIdx } }
      //   )
      //   console.log(updated)
      // })
      // return Promise.all([updatedViwes, selectedView]).then((ref) => {
      //   const users = ref[0]
      //   const contents = ref[1]
      //   _.forEach(posts.rows, (post) => {
      //     post.user = _.find(users, { idx: post.post_user_idx })
      //     post.contents = _.filter(contents, { post_idx: post.post_idx })
      //   })
      //   return posts
    })
    // return commentsPaging
  })
}

// const commentPaging = (params) => {
//   params = params || {}
//   return models.Comments.findAndCountAll({
//     where: {
//       post_idx: params.postIdx
//     },
//     offset: params.offset || 0,
//     limit: params.limit || 12,
//     order: [['idx', 'desc']],
//     raw: true,
//     attributes: {
//       include: [
//         [models.Sequelize.col('User.user_id'), 'user_id'],
//         [models.Sequelize.col('User.username'), 'user_name']
//       ]
//     },
//     include: [
//       {
//         model: models.User,
//         required: true,
//         attributes: []
//       }
//     ]
//   }).then((commentsPaging) => {
//     return commentsPaging
//   })
// }

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
  params = params || {}
  console.log(params)
  const InputPassword = params.password
  return models.Comments.findOne({
    where: {
      idx: params.commentIdx
    },
    raw: true
  }).then((commentPwCheck) => {
    console.log(commentPwCheck)
    const dbPassword = commentPwCheck.password
    console.log(dbPassword)
    const salt = commentPwCheck.salt
    console.log(salt)
    const hashPassword = crypto
      .createHash('sha256')
      .update(InputPassword + salt)
      .digest('hex')
    console.log(hashPassword)
    return false
  })
}
const updatedComment = (params) => {
  console.log(params)

  const CommentPassword = params.password
  const salt = Math.round(new Date().valueOf() * Math.random()) + ''

  const hashPassword = crypto
    .createHash('sha256')
    .update(CommentPassword + salt)
    .digest('hex')
  return models.Comments.update(
    {
      content: params.comment,
      password: hashPassword
    },
    { where: { post_idx: params.postIdx, idx: params.commentIdx } }
  )
}
module.exports = {
  commentInsert,
  commentPaging,
  likeComments,
  dislikeComments,
  commentUpdate,
  updatedComment
}
