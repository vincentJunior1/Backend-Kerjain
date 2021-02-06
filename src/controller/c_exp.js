const helper = require('../helper/response')

const {
  getExpModel,
  getByIdModel,
  getByExpIdModel,
  postExpModel,
  patchExpModel,
  deleteExpModel
} = require('../model/m_exp')

module.exports = {
  getAllExpModel: async (request, response) => {
    try {
      const result = await getExpModel()
      return helper.response(response, 200, 'get Data suscces full', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getById: async (request, response) => {
    try {
      console.log(request.params)
      const { id } = request.params
      const result = await getByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Your Experience', result)
      } else {
        return helper.response(response, 400, 'Bad Request')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postExp: async (request, response) => {
    console.log(request.body)
    try {
      const {
        user_id,
        exp_position,
        exp_company,
        exp_desc,
        exp_start,
        exp_end
      } = request.body
      const setData = {
        user_id,
        exp_position,
        exp_company,
        exp_desc,
        exp_start,
        exp_end,
        exp_created_at: new Date()
      }
      if (setData.exp_position === '') {
        return helper.response(response, 400, 'Colom cannot be empty')
      } else if (setData.exp_company === '') {
        return helper.response(response, 400, 'Colom cannot be empty')
      } else if (setData.exp_desc === '') {
        return helper.response(response, 400, 'Colom cannot be empty')
      } else if (setData.exp_start === '') {
        return helper.response(response, 400, 'Colom cannot be empty')
      } else if (setData.exp_end === '') {
        return helper.response(response, 400, 'Colom cannot be empty')
      } else {
        const result = await postExpModel(setData)
        return helper.response(response, 200, 'Success ++ add ', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  patchExp: async (request, response) => {
    const { id } = request.params
    console.log(request.params)
    try {
      const {
        exp_position,
        exp_company,
        exp_desc,
        exp_start,
        exp_end
      } = request.body
      const setData = {
        exp_position,
        exp_company,
        exp_desc,
        exp_start,
        exp_end,
        exp_updated_at: new Date()
      }
      const checkId = await getByExpIdModel(id)
      if (checkId.length > 0) {
        const result = await patchExpModel(id, setData)
        return helper.response(response, 200, 'DataUpdated', result)
      } else {
        return helper.response(response, 404, `Data Not Found By Id ${id}`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Data Failed Update', error)
    }
  },
  deleteExp: async (request, response) => {
    try {
      console.log(request.params)
      const { id } = request.params
      const result = await deleteExpModel(id)
      return helper.response(response, 200, 'Succes Delete', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
