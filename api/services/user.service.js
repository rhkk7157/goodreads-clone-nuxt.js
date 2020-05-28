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
    const dbPassword = user.password
    console.log(dbPassword)
    const salt = user.salt
    console.log(salt)
    const hashPassword = crypto
      .createHash('sha256')
      .update(InputPassword + salt)
      .digest('hex')
    console.log(hashPassword)
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

  return models.User.create({
    user_id: params.id,
    password: hashPassword,
    salt,
    username: params.username
  }).then((createUser) => {})
}

module.exports = {
  signIn,
  signUp
}
