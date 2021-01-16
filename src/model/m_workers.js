const connection = require('../config/mysql')

module.exports = {
  Get_dataAllWorkers: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user INNER JOIN contact ON user.user_id = user.user_id INNER JOIN portofolio ON user.user_id = portofolio.user_id INNER JOIN skill ON user.user_id = skill.user_id INNER JOIN exp ON user.user_id = exp.user_id',
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
        'SELECT * FROM user WHERE user_id =? ',
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
