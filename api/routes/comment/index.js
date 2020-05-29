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
router.get('/updated', (req, res, next) => {
  const userIdx = req.query.user_idx
  const comment = req.query.comment
  const password = req.query.password
  const postIdx = req.query.postIdx
  const commentIdx = req.query.commentIdx

  commentService
    .updatedComment({
      userIdx,
      comment,
      password,
      postIdx,
      commentIdx
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
// router.get('/updatecheck/:loginUserIdx', (req, res, next) => {
//   console.log(req.params)
// })

router.get('/commentUpdate/:commentIdx', (req, res, next) => {
  const commentIdx = req.params.commentIdx
  const loginUserIdx = req.query.loginUserIdx
  const postIdx = req.query.postIdx
  const password = req.query.password

  commentService
    .commentUpdate({
      commentIdx,
      loginUserIdx,
      postIdx,
      password
    })
    .then((results) => {
      res.json(results)
    })
})

module.exports = router
