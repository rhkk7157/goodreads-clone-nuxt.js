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
    })
})
router.get('/:postIdx', (req, res, next) => {
  const page = +req.query.page || 1
  const limit = +req.query.limit || 5
  const offset = (page - 1) * limit
  const postIdx = req.params.postIdx

  commentService
    .commentPaging({
      page,
      limit,
      offset,
      postIdx
    })
    .then((results) => {
      results.page = page
      res.json(results)
    })
})

router.get('/likes/:commentIdx', (req, res, next) => {
  const commentIdx = req.params.commentIdx
  const userIdx = req.query.user_idx
  const likesStatus = req.query.likes_status
  commentService
    .likeComments({
      commentIdx,
      userIdx,
      likesStatus
    })
    .then((results) => {
      res.json(results)
    })
})

router.get('/dislike/:commentIdx', (req, res, next) => {
  const commentIdx = req.params.commentIdx
  const userIdx = req.query.user_idx
  const likesStatus = req.query.likes_status

  commentService
    .dislikeComments({
      commentIdx,
      userIdx,
      likesStatus
    })
    .then((results) => {
      res.json(results)
    })
})

// router.get('/commentUpdate/:idx', (req, res, next) => {
//   const idx = req.params.idx
//   const userIdx = req.query.userIdx
//   const postIdx = req.query.postIdx

//   commentService
//     .commentUpdate({
//       idx,
//       userIdx,
//       postIdx
//     })
//     .then((results) => {
//       console.log(results)
//     })
// })
module.exports = router
