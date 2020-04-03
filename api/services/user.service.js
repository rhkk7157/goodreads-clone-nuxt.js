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

module.exports = {
  signIn
}
