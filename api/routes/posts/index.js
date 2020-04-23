const path = require('path')
const multer = require('multer')
const router = require('express').Router()
const postsService = require('../../services/posts.service')
const uploadDir = path.join(__dirname, '../../assets/uploads') // 루트의 uploads위치에 저장한다.

// multer 셋팅
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, uploadDir)
    },
    filename: (req, file, callback) => {
      // 확장자 추출
      const ext = path.extname(file.originalname)
      // 이름설정 (basename:확장자 제외 파일명) + 현재시간 + 확장자
      callback(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      )
    }
  })
})
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

// const upload = multer({ storage })
router.get('/', (req, res, next) => {
  const page = +req.query.page || 1
  const limit = +req.query.limit || 24
  const offset = (page - 1) * limit

  const categoryNum = req.query.categoryNum

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
router.post('/insert/upload', upload.single('file'), (req, res, next) => {
  // console.log(req.body)
})
// router.post('/insert', (req, res, next) => {
// const userIdx = req.query.user_idx
// const title = req.query.title
// const subTitle = req.query.sub_title
// const content = req.query.content
// const category = req.query.category
// postsService
//   .postCreate({})
//   .then((r) => {
//     res.json(r)
//   })
//   .catch((error) => {
//     next(error)
//   })
// })
router.get('/insert', (req, res, next) => {
  const userIdx = req.query.user_idx
  const title = req.query.title
  const subTitle = req.query.sub_title
  const content = req.query.content
  const category = req.query.category

  postsService
    .postCreate({
      userIdx,
      title,
      subTitle,
      content,
      category
    })
    .then((r) => {
      res.json(r)
    })
    .catch((error) => {
      next(error)
    })
})

// router.post('/img', upload.single('img'), (req, res) => {
//   console.log(req.query)
//   // console.log(req.body)
// })

module.exports = router
