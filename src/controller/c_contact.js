const {
  postContact,
  getContactByIdModel,
  patchContactModel,
  deleteContactModel,
  getContactCountModel,
  getAllContactModel,
  getAllUserContactModel
} = require('../model/m_contact')

const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  postContact: async (req, res) => {
    try {
      const {
        contact_linkedin,
        contact_instagram,
        contact_phone,
        contact_github
      } = req.body

      const setData = await {
        contact_linkedin,
        contact_instagram,
        contact_phone,
        contact_github,
        contact_created_at: new Date()
      }
      const result = await postContact(setData)
      return helper.response(res, 200, 'Success Post Contact', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getContactById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getContactByIdModel(id)
      if (result.length > 0) {
        client.setex(`getcontactbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Contact By Id', result)
      } else {
        return helper.response(res, 404, `Contact By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateContact: async (req, res) => {
    try {
      const { id } = req.params
      let {
        contact_linkedin,
        contact_instagram,
        contact_phone,
        contact_github
      } = req.body

      const countId = await getContactCountModel(id)
      const checkId = await getContactByIdModel(id)

      if (countId > 0) {
        if (contact_linkedin === '') {
          contact_linkedin = checkId[0].contact_linkedin
        }
        if (contact_instagram === '') {
          contact_instagram = checkId[0].contact_instagram
        }
        if (contact_phone === '') {
          contact_phone = checkId[0].contact_phone
        }
        if (contact_github === '') {
          contact_github = checkId[0].contact_github
        }
        const setData = {
          contact_linkedin,
          contact_instagram,
          contact_phone,
          contact_github,
          contact_updated_at: new Date()
        }
        const result = await patchContactModel(setData, id)
        return helper.response(res, 200, 'Success update contact', result)
      } else {
        return helper.response(
          res,
          404,
          `Coupon By Id : ${id} Is Not Found | Contact is not available`
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params

      const countId = await getContactCountModel(id)
      if (countId > 0) {
        const result = await deleteContactModel(id)
        return helper.response(res, 200, 'Contact has been deleted', result)
      } else {
        return helper.response(res, 404, 'Contact Is Not Available')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllContact: async (req, res) => {
    try {
      const result = await getAllContactModel()
      if (result.length > 0) {
        client.setex('getcontacts', 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Contact', result)
      } else {
        return helper.response(res, 400, 'No Data')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllUserContact: async (req, res) => {
    try {
      const result = await getAllUserContactModel()
      if (result.length > 0) {
        client.setex('getcontactsuser', 3600, JSON.stringify(result))
        return helper.response(
          res,
          200,
          'Success Get User and Their Contact',
          result
        )
      } else {
        return helper.response(res, 400, 'No Data')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
