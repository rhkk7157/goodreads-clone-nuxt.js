const router = require('express').Router()
const commentService = require('../../services/comment.service')

router.get('/insert', (req, res, next) => {
  const userIdx = req.query.user_idx
  const comment = req.query.comment
  const postPassword = req.query.password
  const postIdx = req.query.post_idx

  commentService
    .commentInsert({
      userIdx,
      comment,
      postPassword,
      postIdx
    })
    .then((results) => {
      res.json(results)
      // console.log(results)
    })
})
module.exports = router
