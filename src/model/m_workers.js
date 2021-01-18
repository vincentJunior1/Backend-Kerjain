const connection = require('../config/mysql')

module.exports = {
  dataAllWorkers: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.user_id ,user.user_name , user.user_email, user.user_role, user.user_image, user.user_description, user.user_status, user.user_jobdesc, user.user_field, user.user_location, user.user_workplace, user.user_about, user.user_job_type, user.user_linkedin, user.user_instagram, user.user_phone, user.user_github, skill.skill_name ,exp.exp_id, exp.exp_position, exp.exp_company, exp.exp_desc, exp.exp_start, exp.exp_end FROM user LEFT JOIN skill ON skill.user_id = user.user_id LEFT JOIN exp ON exp.user_id = user.user_id WHERE user_role = 0 GROUP BY user.user_id',
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
            console.log(error)
            reject(new Error(err))
          }
        }
      )
    })
  }
}
