const connection = require('../config/mysql')

module.exports = {
  getSkillPerUserModel: (uId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT skill_id, user_id, GROUP_CONCAT(skill_name) AS skills, skill_created_at, skill_updated_at FROM skill WHERE user_id=${uId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getSkillByIdSkillModel: (sId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM skill WHERE skill_id=${sId}`,
        (error, result) => {
          !error ? resolve(result[0]) : reject(new Error(error))
        }
      )
    })
  },
  getUserSkill: (id) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          `SELECT * FROM skill WHERE user_id=${id}`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      )
    })
  },
  countSkillModel: (sId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(skill_name) AS total FROM skill WHERE skill_id=${sId}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getAllSkillAllUserModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT skill_id, user_id, GROUP_CONCAT(skill_name) AS skills, skill_created_at, skill_updated_at FROM skill GROUP BY user_id',
        (error, result) => {
          console.log('ini result')
          console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postSkillModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO skill SET ?', setData, (error, result) => {
        console.log(setData)
        console.log(result)
        if (!error) {
          const newResult = {
            skill_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  patchSkillModel: (setData, sId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        ' UPDATE skill SET ? WHERE skill_id= ?',
        [setData, sId],
        (error, result) => {
          console.log(result)
          if (!error) {
            const newResult = {
              skill_id: sId,
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
  deleteSkillModel: (sId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM skill WHERE skill_id = ${sId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
