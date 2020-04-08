const multer = require('multer')
const models = require('../models')

const PostsInsertByUserIdx = (params) => {
  const today = new Date()
  return models.Posts.create({
    user_idx: params.userIdx,
    title: params.title,
    sub_title: params.subTitle,
    content: params.content,
    category: params.category,
    created_at: today
  }).then((posts) => {})
}

module.exports = {
  PostsInsertByUserIdx
}
