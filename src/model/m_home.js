const connection = require('../config/mysql')

module.exports = {
  get: (limit, offset, sort, search) => {
    const sorting =
      sort === 'freelance' || sort === 'fulltime'
        ? `and user.user_job_type = '${sort}'`
        : ''
    const sortingBy =
      sort === 'user_name' || sort === 'user_location'
        ? `order by '${sort}'`
        : ''
    const skill = sort == 'skill' ? ` ORDER BY sub.total_skill DESC` : ''
    const searching = search != null ? `AND sub.skills like '%${search}%'` : ''
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id ${skill}${sorting}${searching}${sortingBy} LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(new Error(err))
            console.log(new Error(err))
          }
        }
      )
    })
  },
  getJobseekerCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM user WHERE user_role=1',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getFulltimeFreelanceCountModel: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM user WHERE user_role=1 AND user_job_type='${sort}'`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getTotalDataSearchCount: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(sub.user_id) AS total FROM (SELECT user_id FROM skill WHERE skill_name LIKE '%${search}%' group by user_id) sub`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total)
            console.log(result[0].total)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
