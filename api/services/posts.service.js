// const multer = require('multer')
const models = require('../models')

const postCreate = (params) => {
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

const findAndCountAll = (params) => {
  return models.Posts.findAndCountAll({
    // where: { created_at: null },
    limit: params.limit || 24,
    offset: params.offset || 0,
    order: [['created_at', 'desc']],
    raw: true
  }).then((posts) => {
    return posts
    // console.log(posts)
  })
}

module.exports = {
  postCreate,
  findAndCountAll
}
