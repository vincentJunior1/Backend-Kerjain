const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')

module.exports = {
  get: (limit, offset, sort, search) => {
    const sorting =
      sort === 'freelance' || sort === 'fulltime'
        ? `and user.user_job_type = '${sort}'`
        : ''
    const sortingBy =
      sort === 'user.user_name' || sort === 'user_location'
        ? `order by ${sort} ASC`
        : ''
    const skill = sort === 'skill' ? ` ORDER BY sub.total_skill DESC` : ''
    const searching =
      search !== undefined ? ` AND sub.skills like '%${search}%'` : ''
    return actionQuery(
      `SELECT *, sub.total_skill, sub.skills FROM user, (SELECT skill.user_id, GROUP_CONCAT(DISTINCT(skill.skill_name)) AS skills, COUNT(*) AS total_skill FROM skill GROUP BY skill.user_id) sub WHERE user.user_role=0 AND sub.user_id = user.user_id ${skill}${sorting}${searching}${sortingBy} LIMIT ${limit} OFFSET ${offset}`
    )
  },
  count: (sort) => {
    return new Promise((resolve, reject) => {
      const sorting =
        sort === 'freelance' || sort === 'fulltime'
          ? `and user.user_job_type = '${sort}'`
          : ''
      const sortingBy =
        sort === 'user.user_name' || sort === 'user_location'
          ? `order by '${sort}' ASC`
          : ''
      connection.query(
        `select count(*) as total FROM user WHERE user.user_role=0 ${sorting}${sortingBy}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
