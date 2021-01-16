const connection = require('../config/mysql')

module.exports = {
  createRoomChat: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room_chat SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  sendJobModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
        if (!error) {
          const newData = {
            ...result.insertId,
            ...data
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
