const router = require('express').Router()
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
