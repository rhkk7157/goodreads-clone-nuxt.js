// const multer = require('multer')
const path = require('path')
const multer = require('multer')
const models = require('../models')
const uploadDir = path.join(__dirname, '../../assets/uploads') // 루트의 uploads위치에 저장한다.

// multer 셋팅
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 이미지가 저장되는 도착지 지정
    callback(null, uploadDir)
  },
  filename: (req, file, callback) => {
    // products-날짜.jpg(png) 저장
    callback(null, 'products-' + Date.now() + '.' + file.mimetype.split('/')[1])
  }
})
const upload = multer({ storage })

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
    // multer img upload
  })
}

const findAndCountAll = (params) => {
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
    return posts
    // console.log(posts)
  })
}

module.exports = {
  postCreate,
  findAndCountAll
}
