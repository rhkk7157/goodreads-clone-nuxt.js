const router = require('express').Router()
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy

// const dotenv = require('dotenv')
// dotenv.config()

const authService = require('../../services/user.service')

router.post('/signin', (req, res, next) => {
  const id = req.body.id
  const password = req.body.password

  authService
    .signIn({
      id,
      password
    })
    .then((r) => {
      if (r === undefined) {
      }
      req.session.authUser = r
      res.json(r)
    })
    .catch((error) => {
      next(error)
    })
})

router.get('/session', (req, res, next) => {
  res.json((req.session && req.session.authUser) || null)
})

router.post('/signout', (req, res, next) => {
  req.session.destroy()
  // delete req.session.authUsers
  // res.redirect('/')
  res.json({ ok: true })
})

module.exports = router
