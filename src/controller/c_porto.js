const {
  getPorto,
  getPortoById,
  getPortoByUserId,
  postPorto,
  patchPorto,
  deletePorto
} = require('../model/m_porto')
const helper = require('../helper/response')
const fs = require('fs')

module.exports = {
  getPorto: async (request, response) => {
    try {
      const { id } = request.query

      let result
      if (id) {
        result = await getPortoById(id)
        if (result.length === 0) {
          return helper.response(
            response,
            404,
            `Portofolio By Id : ${id} Not Found`
          )
        }
      } else {
        result = await getPorto()
        if (result.length === 0) {
          return helper.response(response, 404, 'no data')
        }
      }

      return helper.response(response, 200, 'Success get portofolio', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getPortoByUserId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getPortoByUserId(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `success get portofolio by user ${id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Portofolio by user id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postPorto: async (request, response) => {
    try {
      const { user_id, porto_name, porto_link, porto_type } = request.body

      if (!user_id || !porto_name || !porto_link || !porto_type) {
        return helper.response(response, 400, 'Please fill all column !')
      }

      const setData = {
        user_id,
        porto_name,
        porto_link,
        porto_type,
        porto_image: request.file === undefined ? '' : request.file.filename,
        porto_created_at: new Date()
      }

      const result = await postPorto(setData)
      return helper.response(response, 200, 'Success Post Portofolio', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchPorto: async (request, response) => {
    try {
      const { id } = request.params

      const { user_id, porto_name, porto_link, porto_type } = request.body

      let portoImage
      const porto = await getPortoById(id)

      if (porto.length === 0) {
        return helper.response(
          response,
          404,
          `Portofolio By Id : ${id} Not Found`
        )
      } else {
        if (request.file === undefined) {
          portoImage = porto[0].porto_image
        } else {
          if (porto[0].porto_image) {
            portoImage = request.file.filename
            fs.unlink(
              `./uploads/porto/${porto[0].porto_image}`,
              function (err) {
                if (err) throw err
                console.log('File deleted!')
              }
            )
          } else {
            portoImage = request.file.filename
          }
        }
      }

      const setData = {
        user_id,
        porto_name,
        porto_link,
        porto_type,
        porto_image: portoImage,
        porto_updated_at: new Date()
      }

      const result = await patchPorto(setData, id)

      return helper.response(response, 200, 'Success update portofolio', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deletePorto: async (request, response) => {
    try {
      console.log('masuk kontroller')
      const { id } = request.params

      const porto = await getPortoById(id)
      if (porto.length > 0) {
        if (porto[0].porto_image) {
          fs.unlink(`./uploads/porto/${porto[0].porto_image}`, function (err) {
            if (err) throw err
            console.log('File deleted!')
          })
        }
        const result = await deletePorto(id)
        return helper.response(
          response,
          200,
          'Success delete portofolio',
          result
        )
      } else {
        return helper.response(response, 404, 'Portofolio Not Found')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
