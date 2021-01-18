const {
  getJobseekerCountModel,
  getFulltimeFreelanceCountModel,
  getJobseekerModel,
  getTotalDataSearchCount,
  getFulltimeFreelanceSearchCountModel,
  getSkillCountModel
} = require('../model/m_home')

const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getJobseeker: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page)
      limit = parseInt(limit)

      let totalData

      if (sort !== '') {
        if (search !== '') {
          if (sort === 'fulltime' || sort === 'freelance') {
            totalData = await getFulltimeFreelanceSearchCountModel(sort, search)
          } else if (sort === 'skill') {
            totalData = await getSkillCountModel(search)
          } else {
            totalData = await getTotalDataSearchCount(search)
          }
        } else {
          if (sort === 'fulltime' || sort === 'freelance') {
            totalData = await getFulltimeFreelanceCountModel(sort)
          } else if (sort === 'skill') {
            search = ''
            totalData = await getSkillCountModel(search)
          } else {
            totalData = await getJobseekerCountModel()
          }
        }
      } else {
        if (search !== '') {
          totalData = await getTotalDataSearchCount(search)
        } else {
          totalData = await getJobseekerCountModel()
        }
      }

      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/home/home?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/home/home?${prevLink}`
      }

      const result = await getJobseekerModel(limit, offset, sort, search)
      if (result) {
        return helper.response(
          res,
          200,
          'Success Show List of Jobseekers',
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 400, 'Data Not Found')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
