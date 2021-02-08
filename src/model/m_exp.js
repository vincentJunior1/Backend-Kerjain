const connection = require('../config/mysql')

module.exports = {
  getExpModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM exp user_id', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM exp WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getByExpIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM exp WHERE exp_id = ?',
        id,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postExpModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO exp SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            exp_id: result.insertId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchExpModel: (id, setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE exp SET ? WHERE exp_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              exp_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteExpModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM exp WHERE exp_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
