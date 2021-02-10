const connection = require('../config/mysql')

module.exports = {
  dataAllWorkers: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user LEFT JOIN (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub ON sub.user_id = user.user_id LEFT JOIN (SELECT portofolio.user_id, GROUP_CONCAT(DISTINCT(portofolio.porto_id)) AS portos FROM portofolio GROUP BY portofolio.user_id) sub2 ON sub2.user_id = user.user_id LEFT JOIN (SELECT exp.user_id, GROUP_CONCAT(DISTINCT(exp.exp_id)) AS exps FROM exp GROUP BY exp.user_id) sub3 ON sub3.user_id = user.user_id WHERE user.user_role=0',
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
        'SELECT * FROM user WHERE user_id =?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  dataByCheckId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id =?',
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
        'SELECT user_id, user_email, user_password ,user_role FROM user WHERE user_email = ? AND user_role = 0',
        account,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getUserByKeyModel: (keys) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_key = ?',
        keys,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  changePassword: (setData, email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_email = ?',
        [setData, email],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_email: email,
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
  settingWorkersModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (error, result) => {
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
        }
      )
    })
  }
}
