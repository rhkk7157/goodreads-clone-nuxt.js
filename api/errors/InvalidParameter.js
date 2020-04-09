module.exports = class extends require('./AppError') {
  constructor(messages, name) {
    super(messages || 'Invalid Parameters', 422)
    if (name) {
      this.name = 'INVALID_PARAMETERS_' + name
    } else {
      this.name = 'INVALID_PARAMETERS'
    }
  }
}
