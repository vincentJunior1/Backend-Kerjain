const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authWorkers: (request, response, next) => {
    let token = request.headers.authWorkers
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        return helper.response(response, 400, error.message)
      } else {
        request.token = result
        next()
      }
    })
  },
  authRecruiter: (request, response, next) => {
    let token = request.headers.authRecruiter
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        return helper.response(response, 400, error.message)
      } else {
        if (result.user_role === 1) {
          request.token = result
          next()
        } else {
          return helper.response(
            response,
            202,
            'Sorry :)) Just Requiter Can do that '
          )
        }
      }
    })
  }
}
