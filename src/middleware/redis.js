const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getSkillPerUserRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getskillperuser:${id}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Skill By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getAllSkillAllUserRedis: (req, res, next) => {
    client.get('getskills', (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Skill',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  clearDataSkillRedis: (req, res, next) => {
    client.keys('getskill*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getContactByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getcontactbyid:${id}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Contact By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getAllContactRedis: (req, res, next) => {
    client.get('getcontacts', (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Contact',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getAllUserContactRedis: (req, res, next) => {
    client.get('getcontactsuser', (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Contact',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  clearDataContactRedis: (req, res, next) => {
    client.keys('getcontact*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getJobseekerRedis: (req, res, next) => {
    client.get(`gethome:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        return helper.response(
          res,
          200,
          'Success Get Data By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  clearDataHomeRedis: (req, res, next) => {
    client.keys('gethome*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
