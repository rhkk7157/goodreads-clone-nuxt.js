const router = require('express').Router()
const postsService = require('../../services/posts.service')

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
module.exports = router
