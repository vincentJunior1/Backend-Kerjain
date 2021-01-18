const connection = require('../config/mysql')

module.exports = {
  getCountId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM user WHERE user_id= ?',
        id,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getImageById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_image FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result[0].user_image) : reject(new Error(error))
        }
      )
    })
  },
  edit: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            console.log(result)
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
