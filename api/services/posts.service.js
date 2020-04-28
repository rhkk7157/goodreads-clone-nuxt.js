// const multer = require('multer')

const _ = require('lodash')
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
  }).then((posts) => {
    return posts
    // multer img upload
  })
}

const findAndCountAll = async (params) => {
  params = params || {}
  const limit = params.limit || 0
  const offset = params.offset
  const where = {}
  let category
  // categoryNum : undefined
  if (params.categoryNum) {
    category = params.categoryNum

    if (category === '0') {
      category = 'Cook'
    } else if (category === '1') {
      category = 'Travel'
    } else if (category === '2') {
      category = 'Art'
    } else if (category === '3') {
      category = 'Webtoon'
    } else {
      category = ''
    }
    where.category = category
  }

  const TotalCount = await models.sequelize.query(
    `SELECT count(*) as count FROM posts where category = ?`,
    {
      type: models.Sequelize.QueryTypes.SELECT,
      raw: true,
      replacements: [category]
    }
  )

  const query = await models.sequelize.query(
    `SELECT * FROM posts where category = ? order by created_at desc limit ? offset ?`,
    {
      type: models.Sequelize.QueryTypes.SELECT,
      replacements: [category, limit, offset],
      raw: true
    }
  )

  const total = JSON.stringify(TotalCount)
  const result = JSON.parse(total)
  const count = result[0].count
  const results = { rows: query, count }
  return results

  // return models.Posts.findAndCountAll({
  //   where,

  //   limit: params.limit || 24,
  //   offset: params.offset || 0,
  //   order: [['created_at', 'desc']],
  //   raw: true
  // }).then((posts) => {
  //   const postIdx = _.map(posts.rows, 'idx')
  //   console.log(postIdx)
  //   const PostsCount = models.PostsLikes.findAll({
  //     where: {
  //       post_idx: {
  //         [models.Sequelize.Op.in]: postIdx
  //       }
  //     },
  //     raw: true
  //   })
  //   const result = JSON.stringify(PostsCount)
  //   console.log(result)
  //   return false
  // })
}

const addLikePost = (params) => {
  const today = new Date()
  const userIdx = params.userIdx
  const postIdx = params.postIdx

  return models.PostsLikes.create({
    user_idx: userIdx,
    post_idx: postIdx,
    created_at: today
  }).then((postsLikes) => {
    // return postsLikes
    return models.PostsLikes.findAndCountAll({
      where: {
        post_idx: postIdx
      }
    }).then((res) => {
      const postsLikesCount = res.count
      return models.Posts.update(
        { likes: postsLikesCount },
        { where: { idx: postIdx } }
      ).then((addPostsLikes) => {
        return res
      })
    })
  })
}

module.exports = {
  postCreate,
  findAndCountAll,
  addLikePost
}
