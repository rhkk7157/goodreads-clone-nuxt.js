const crypto = require('crypto')
const _ = require('lodash')
const models = require('../models')

const signIn = (params) => {
  return models.User.findOne({
    where: {
      user_id: params.id,
      password: params.password
    }
  }).then((user) => {
    if (_.isEmpty(user)) {
      this.name = 'error'
      return name
    } else {
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
    username: params.username,
    created_at: today
  }).then((createUser) => {})
}

module.exports = {
  signIn,
  signUp
}
