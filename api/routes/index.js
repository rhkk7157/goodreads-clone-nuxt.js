const express = require('express')
const _ = require('lodash')
const router = express.Router()

const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.use('/auth', require('./auth'))
router.use('/user', require('./users'))
router.use('/posts', require('./posts'))
router.use('/comment', require('./comment'))

router.use((err, req, res, next) => {
  const status = err.status || 500

  // DB Error

  const errorName = _.get(err, 'name', '').toLowerCase()

  if (
    _.includes(errorName, 'sequelize') ||
    _.includes(errorName, 'sql') ||
    _.includes(errorName, 'db') ||
    _.includes(errorName, 'database')
  ) {
    err.message = 'Database Error'
  }

  res.status(status)
  const msg = (err.message && err.message.replace('\t', '')) || undefined

  res.json({
    status,
    error: msg || err || 'Unknown',
    name: err.name || undefined
  })
})

module.exports = {
  path: '/api',
  handler: router
}
