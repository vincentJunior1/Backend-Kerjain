const connection = require('../config/mysql')

module.exports = {
  dataAllWorkers: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.user_id,user.*,skill.*,exp.*,contact.* FROM user LEFT JOIN skill ON skill.user_id = user.user_id LEFT JOIN exp ON exp.user_id = user.user_id LEFT JOIN contact ON contact.contact_id = user.contact_id WHERE user_role = 0',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  dataWorkersModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_role = 0 ',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  dataByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id =? AND user_role = 0 ',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  registerUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
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
  loginCheckModel: (account) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_id, user_email, user_password ,user_role FROM user WHERE user_email = ?',
        account,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getUserByKeyModel: (key) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_key = ?',
        key,
        (err, res) => {
          !err ? resolve(res) : reject(new Error(err))
        }
      )
    })
  },
  settingWorkersModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (err, res) => {
          if (!err) {
            const newRes = {
              user_id: id,
              ...setData
            }
            resolve(newRes)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
}
