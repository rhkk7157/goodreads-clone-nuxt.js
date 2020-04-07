const router = require('express').Router()
const userService = require('../../services/user.service')

router.get('/', (req, res, next) => {
  const id = req.query.id
  const password = req.query.password
  const username = req.query.username

  userService
    .signUp({
      id,
      password,
      username
    })
    .then((r) => {
      res.json(r)
    })
    .catch((error) => {
      next(error)
    })
})
module.exports = router
