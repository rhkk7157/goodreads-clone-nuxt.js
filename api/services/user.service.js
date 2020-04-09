const crypto = require('crypto')
// const moment = require('moment')
const _ = require('lodash')
const models = require('../models')

// const {
//   InvalidParameters,
//   NotFound
//   AuthenticationFailed
// } = require('../errors')

const signIn = (params) => {
  params = params || {}
  // if (!params.id) return Promise.reject(new InvalidParameters(null, 'ID'))
  // if (!params.password)
  //   return Promise.reject(new InvalidParameters(null, 'PASSWORD'))

  const InputPassword = params.password
  return models.User.findOne({
    where: {
      user_id: params.id
    },
    raw: true
  }).then((user) => {
    const dbPassword = user.dataValues.password
    const salt = user.dataValues.salt
    const hashPassword = crypto
      .createHash('sha256')
      .update(InputPassword + salt)
      .digest('hex')

    if (dbPassword === hashPassword) {
      return user
    }
  })
}

const signUp = (params) => {
  const InputPassword = params.password
  const salt = Math.round(new Date().valueOf() * Math.random()) + ''

  const hashPassword = crypto
    .createHash('sha256')
    .update(InputPassword + salt)
    .digest('hex')

  const today = new Date()

  return models.User.create({
    user_id: params.id,
    password: hashPassword,
    salt,
    username: params.username,
    created_at: today
  }).then((createUser) => {})
}

module.exports = {
  signIn,
  signUp
}
