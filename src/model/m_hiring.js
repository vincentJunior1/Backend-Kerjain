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
  sendChatModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
        console.log(error)
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
  },
  getAllRoomchat: (user) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM room_chat LEFT JOIN user ON room_chat.user_id_to = user.user_id WHERE user_id_to = ${user} OR user_id_from = ${user} `,
        (error, result) => {
          console.log('ok')
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDetailDataRoomChat: (room, user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat LEFT JOIN user ON chat.user_id_to = user.user_id WHERE room_chat = ${room} ORDER BY chat_created_at DESC `,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
