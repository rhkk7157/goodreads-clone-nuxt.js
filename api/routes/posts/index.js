const path = require('path')
const multer = require('multer')
const express = require('express')
const app = express()
const router = require('express').Router()
const postsService = require('../../services/posts.service')
// const uploadDir = path.join(__dirname, '../../assets/uploads') // 루트의 uploads위치에 저장한다.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split('/')
  const fileType = typeArray[1]
  if (
    fileType === 'jpg' ||
    fileType === 'png' ||
    fileType === 'jpeg' ||
    fileType === 'gif'
  ) {
    cb(null, true)
  } else {
    req.fileValidationError = 'jpg, jpeg, png, gif 파일만 업로드 가능합니다.'
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limites: {
    fileSize: 5 * 1024 * 1024
  }
})

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
//   if (!allowedTypes.includes(file.mimetype)) {
//     const error = new Error('Incorrect file')
//     error.code = 'INCORRECT_FILETYPE'
//     // error occured
//     return cb(error, false)
//   }
//   cb(null, true)
// }

// // multer 셋팅
// const upload = multer({
//   dest: 'assets/uploads',
//   fileFilter,
//   limits: {
//     fileSize: 500000
//   }
// })

// router.get('/uploads', express.static('uploads'))

router.post('/insert/upload', upload.single('img'), (req, res, next) => {
  const userIdx = req.body.user_idx
  const title = req.body.title
  const subTitle = req.body.sub_title
  const content = req.body.content
  const category = req.body.category

  const fileName = req.file.filename
  const filePath = req.file.path
  const originalName = req.file.originalname
  const size = req.file.size

  postsService
    .fileUpload({
      userIdx,
      title,
      subTitle,
      content,
      category,
      originalName,
      fileName,
      filePath,
      size
    })
    .then((results) => {
      res.json(results)
    })
})
// const upload = multer({ storage })
router.get('/main/:categoryNum', (req, res, next) => {
  const page = +req.query.page || 1
  const limit = +req.query.limit || 24
  const offset = (page - 1) * limit

  let categoryNum = req.params.categoryNum
  if (categoryNum === 'null') {
    categoryNum = undefined
  }

  postsService
    .findAndCountAll({
      page,
      limit,
      offset,
      categoryNum
    })
    .then((results) => {
      results.page = page
      res.json(results)
    })
})

// router.get('/insert', (req, res, next) => {
//   const userIdx = req.query.user_idx
//   const title = req.query.title
//   const subTitle = req.query.sub_title
//   const content = req.query.content
//   const category = req.query.category

//   postsService
//     .postCreate({
//       userIdx,
//       title,
//       subTitle,
//       content,
//       category
//     })
//     .then((r) => {
//       res.json(r)
//     })
//     .catch((error) => {
//       next(error)
//     })
// })

router.get('/likePost', (req, res, next) => {
  const postIdx = req.query.post_idx
  const userIdx = req.query.user_idx

  postsService
    .addLikePost({
      postIdx,
      userIdx
    })
    .then((r) => {
      res.json(r)
    })
    .catch((error) => {
      next(error)
    })
})

// router.get('/likeCount', (req, res, next) => {
//   const postIdx = req.query.postIdx

//   postsService
//     .newLikeCount({
//       postIdx
//     })
//     .then((r) => {
//       res.json(r)
//     })
//     .catch((error) => {
//       next(error)
//     })
// })

// router.post('/img', upload.single('img'), (req, res) => {
//   console.log(req.query)
//   // console.log(req.body)
// })

module.exports = router
