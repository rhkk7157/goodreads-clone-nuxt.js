const router = require('express').Router()
const postsService = require('../../services/posts.service')

router.get('/insert', (req, res, next) => {
  // this.$store.dispatch('login')
  const userIdx = req.query.user_idx
  const title = req.query.title
  const subTitle = req.query.sub_title
  const content = req.query.content
  const category = req.query.category

  postsService
    .PostsInsertByUserIdx({
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
