const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        return helper.response(res, 400, error.message)
      } else {
        res.token = result
        next()
      }
    })
  }
}
