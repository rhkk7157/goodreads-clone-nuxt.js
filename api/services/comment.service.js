const models = require('../models')

const commentInsert = (params) => {
  params = params || {}
  // const userIdx = params.userIdx
  // const comment = params.comment
  // const postPassword = params.postPassword
  // const postIdx = params.postIdx

  return models.Comments.create({
    user_idx: params.userIdx,
    password: params.postPassword,
    content: params.comment,
    post_idx: params.postIdx
  }).then((comments) => {
    return comments
    // console.log(comments)
  })
}

module.exports = {
  commentInsert
}
