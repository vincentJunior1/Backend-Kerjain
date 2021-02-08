const { get, count } = require('../model/m_home')

const { response } = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getJobseeker: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page)
      limit = parseInt(limit)

      const totalData = await count(sort)
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
      const result = await get(limit, offset, sort, search)
      return response(res, 200, 'Success get data', result, pageInfo)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad Request', error)
    }
  }
}
