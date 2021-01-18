const connection = require('../config/mysql')

module.exports = {
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

  getFulltimeFreelanceSearchCountModel: (sort, search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS totaldata FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id AND user_job_type='${sort}' AND sub.skills LIKE '%${search}%'`,
        (error, result) => {
          !error ? resolve(result[0].totaldata) : reject(new Error(error))
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
  },

  getSkillCountModel: (search) => {
    const searching = search === '' ? '' : `AND sub.skills LIKE '%${search}%'`
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS totaldata FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id ${searching}`,
        (error, result) => {
          !error ? resolve(result[0].totaldata) : reject(new Error(error))
        }
      )
    })
  },

  getJobseekerModel: (limit, offset, sort, search) => {
    return new Promise((resolve, reject) => {
      if (sort === '' && search !== '') {
        connection.query(
          `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id AND sub.skills LIKE '%${search}%'`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      } else if (search === '' && sort !== '') {
        if (sort === 'user_name' || sort === 'user_location') {
          connection.query(
            `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        } else if (sort === 'skill') {
          connection.query(
            `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id ORDER BY sub.total_skill DESC LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        } else if (sort === 'freelance' || sort === 'fulltime') {
          connection.query(
            `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id AND user.user_job_type='${sort}' LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        }
      } else if (sort !== '' && search !== '') {
        if (sort === 'freelance' || sort === 'fulltime') {
          connection.query(
            `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id AND user.user_job_type='${sort}' AND sub.skills LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        } else {
          connection.query(
            `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id AND sub.skills LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error))
            }
          )
        }
      } else {
        connection.query(
          `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=1 AND sub.user_id = user.user_id LIMIT ${limit} OFFSET ${offset}`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      }
    })
  }
}
