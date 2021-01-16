const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authWorkers: (request, response, next) => {
    let token = request.headers.authWorkers
    console.log(token)
    token = token.split(' ')[1]
    jwt.verify(token, 'KERJAIN', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        console.log(error)
        return helper.response(response, 400, error.message)
      } else {
        console.log(result)
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
        console.log(error)
        return helper.response(response, 400, error.message)
      } else {
        console.log(result)

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
