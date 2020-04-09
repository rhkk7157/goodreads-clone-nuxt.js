module.exports = class extends require('./AppError') {
  constructor(messages, name) {
    super(messages || 'Not Found', 404)

    if (name) {
      this.name = 'NOT_FOUND_' + name
    } else {
      this.name = 'NOT_FOUND'
    }
  }
}
