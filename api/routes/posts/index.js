// const path = require('path')
const multer = require('multer')
const router = require('express').Router()
const postsService = require('../../services/posts.service')
// const uploadDir = path.join(__dirname, '../../assets/uploads') // 루트의 uploads위치에 저장한다.

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file')
    error.code = 'INCORRECT_FILETYPE'
    // error occured
    return cb(error, false)
  }
  cb(null, true)
}

// multer 셋팅
const upload = multer({
  dest: '../../assets/uploads',
  fileFilter,
  limits: {
    fileSize: 500000
  }
})

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, callback) {
//       callback(null, uploadDir)
//     },
//     filename: (req, file, callback) => {
//       // 확장자 추출
//       const ext = path.extname(file.originalname)
//       // 이름설정 (basename:확장자 제외 파일명) + 현재시간 + 확장자
//       callback(
//         null,
//         path.basename(file.originalname, ext) + new Date().valueOf() + ext
//       )
//     }
//   })
// })
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     // 이미지가 저장되는 도착지 지정
//     callback(null, uploadDir)
//   },
//   filename: (req, file, callback) => {
//     const ext = path.extname(file.originalname)
//     callback(
//       null,
//       path.basename(file.originalname, ext) + new Date().valueOf() + ext
//     )
//     // products-날짜.jpg(png) 저장
//     // callback(null, 'products-' + Date.now() + '.' + file.mimetype.split('/')[1])
//   }
// })
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
  // console.log(fileName, filePath, originalName)
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
      // console.log(results)
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
