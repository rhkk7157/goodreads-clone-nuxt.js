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

const findAndCountAll = (params) => {
  console.log(params)

  params = params || {}
  const where = {}

  if (params.categoryNum) {
    let categoryName = params.categoryNum

    if (categoryName === '0') {
      categoryName = 'Cook'
    } else if (categoryName === '1') {
      categoryName = 'Travel'
    } else if (categoryName === '2') {
      categoryName = 'Art'
    } else if (categoryName === '3') {
      categoryName = 'Webtoon'
    }
    where.category = categoryName
  }

  return models.Posts.findAndCountAll({
    where,
    // where: { created_at: null },

    limit: params.limit || 24,
    offset: params.offset || 0,
    order: [['created_at', 'desc']],
    raw: true
  }).then((posts) => {
    // return posts
    // 좋아요 카운트
    // return models.PostsLikes.findAndCountAll({
    //   where: {
    //     post_idx: postIdx
    //   }
    // }).then((res) => {
    //   const postsLikesCount = res.count
    //   return models.Posts.update(
    //     { comments: postsLikesCount },
    //     { where: { idx: postIdx } }
    //   ).then((addPostsLikes) => {
    //     return res
    //   })
    // })
    //

    // _.forEach(postIdxs, (idx) => {
    const postIdx = _.map(posts.rows, 'idx')
    console.log(postIdx)
    _.forEach(postIdx, (idx) => {
      const countData = models.PostsLikes.count({
        raw: true,
        where: {
          post_idx: idx
        }
      })
      console.log(countData)
    })

    // _.forEach(postIdx, (idx) => {
    //   console.log(idx)

    //   models.PostsLikes.findAll({
    //     where: {
    //       post_idx: {
    //         post_idx: idx
    //       }
    //     }
    //   })
    // }).then((r) => {
    //   console.log(r)
    // })

    // postIdx.forEach(posts.rows, (idx) => {
    //   models.PostsLikes.count({
    //     where: {
    //       post_idx: {
    //         [models.Sequelize.Op.in]: idx
    //       }
    //     }
    //   }).then((res) => {
    //     console.log(res)
    //   })
    // })

    // const test = models.sequelize.query(
    //   `select count(*) from posts_likes where post_idx =` + idx,
    //   {
    //     type: models.Sequelize.QueryTypes.SELECT,
    //     raw: true
    //   }
    // )
    // console.log(test)
    // })

    return false
    // const usersPromise = models.User.findAll({
    //   where: {
    //     idx: {
    //       [models.Sequelize.Op.in]: postUserIdx
    //     }
    //   },
    //   raw: true
    // })

    // return false
    // return Promise.all([postCount, postCount2]).then((ref) => {
    //   console.log(ref)
    //   return false
    // })
    // _.forEach(postIdx, (idx) => {})
    // _.forEach(posts.rows, (idx) => {
    // models.PostsLikes.count({
    //   where: {
    //     post_idx: {
    //       [models.Sequelize.Op.in]: idx
    //     }
    //   }
    // }).then((c) => {
    //   console.log(c)
    // })
    // })
  })
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
    return postsLikes
    // return models.PostsLikes.findAndCountAll({
    //   where: {
    //     post_idx: postIdx
    //   }
    // }).then((res) => {
    //   const postsLikesCount = res.count
    //   return models.Posts.update(
    //     { comments: postsLikesCount },
    //     { where: { idx: postIdx } }
    //   ).then((addPostsLikes) => {
    //     return res
    //   })
    // })
  })
}

module.exports = {
  postCreate,
  findAndCountAll,
  addLikePost
}
