const { edit, getCountId, getImageById } = require('../model/m_editPhoto')

const helper = require('../helper/response')
const fs = require('fs')

module.exports = {
  editPhoto: async (req, res) => {
    try {
      console.log('masuk')
      const { user_id } = res.token
      const countId = await getCountId(user_id)
      console.log(countId)
      let user_image
      if (countId > 0) {
        const checkId = await getImageById(user_id)
        console.log(checkId)
        if (req.file === undefined) {
          user_image = checkId
        } else {
          if (checkId !== '' || checkId !== null) {
            fs.unlink(`uploads/workers/${checkId}`, function (err) {
              if (err) {
                throw err
              } else console.log('File has been changed!')
            })
          }
          user_image = req.file.filename
          console.log('ini nama file ' + user_image)
        }

        const setData = {
          user_image,
          user_updated_at: new Date()
        }
        const result = await edit(setData, user_id)
        console.log(result)
        return helper.response(res, 200, 'Success update photo', result)
      } else {
        if (req.file !== undefined) {
          fs.unlink(`uploads/workers/${req.file.filename}`, function (err) {
            if (err) {
              throw err
            } else console.log('Uploading image is canceled')
          })
        }
        return helper.response(res, 404, `User By Id : ${user_id} Not Found`)
      }
    } catch (error) {
      fs.unlink(`uploads/workers/${req.file.filename}`, function (err) {
        if (err) {
          throw err
        } else console.log('Uploading image is canceled')
      })
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
