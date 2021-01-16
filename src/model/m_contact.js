const connection = require('../config/mysql')

module.exports = {
  postContact: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO contact SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              contact_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getContactByIdModel: (uId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user LEFT JOIN contact ON contact.contact_id = user.contact_id WHERE user.user_id = ?',
        uId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getContactCountModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM contact WHERE contact_id = ?',
        id,
        (error, result) => {
          const newResult = result[0].total
          !error ? resolve(newResult) : reject(new Error(error))
        }
      )
    })
  },
  patchContactModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE contact SET ? WHERE contact_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              contact_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteContactModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM contact WHERE contact_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllContactModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM contact', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getAllUserContactModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user LEFT JOIN contact ON contact.contact_id = user.contact_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
