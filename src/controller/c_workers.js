const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const {
  loginCheckModel,
  registerUserModel,
  dataWorkersModel,
  dataAllWorkers,
  dataByIdModel,
  getUserByKeyModel,
  settingWorkersModel
} = require('../model/m_workers')

module.exports = {
  DataWorkers: async (request, response) => {
    try {
      const result = await dataAllWorkers()
      return helper.response(response, 200, 'get Data suscces full', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  dataById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await dataByIdModel(id)
      return helper.response(
        response,
        200,
        'get Data history suscces full',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      console.log(request.body)

      if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert email Please :)')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please :)')
      } else {
        const checkDataUser = await loginCheckModel(user_email)
        console.log(checkDataUser)
        if (checkDataUser.length > 0) {
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          )
          console.log(checkPassword)
          if (checkPassword) {
            const {
              user_id,
              user_name,
              user_email,
              user_role
            } = checkDataUser[0]
            const paylot = {
              user_id,
              user_name,
              user_email,
              user_role
            }
            const token = jwt.sign(paylot, 'KERJAIN', { expiresIn: '10h' })
            const result = { ...paylot, token }
            return helper.response(
              response,
              200,
              'Succes Login + Pekerja +',
              result
            )
          } else {
            return helper.response(response, 404, 'wrong password !')
          }
        } else {
          return helper.response(response, 404, 'account not register !')
        }
      }
    } catch (error) {
      return helper.response(response, 404, 'bad request', error)
    }
  },
  registerWorkers: async (request, response) => {
    try {
      //   console.log(request.body)
      const { user_name, user_email, user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_image: 'blank-profile.jpg',
        user_name,
        user_email,
        user_password: encryptPassword
      }
      const checkDataUser = await loginCheckModel(user_email)
      if (checkDataUser.length >= 1) {
        return helper.response(response, 400, 'Email has been register :((')
      } else if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert EMAIL Please :))')
      } else if (request.body.user_email.search('@') < 1) {
        return helper.response(
          response,
          400,
          'Email not valid  !!, must be @ s'
        )
      } else if (
        request.body.user_password < 8 ||
        request.body.user_password > 16
      ) {
        return helper.response(
          response,
          400,
          'Password must be 8 - 16 characters '
        )
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please')
      } else if (request.body.user_phone === '') {
        return helper.response(response, 400, 'Insert your Phone Please')
      } else {
        const result = await registerUserModel(setData)
        return helper.response(response, 200, 'ok', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  settingWorkers: async (request, response) => {
    try {
      console.log(request.body)
      const { id } = request.params
      const {
        user_image,
        user_name,
        user_jobdesc,
        user_location,
        user_workplace,
        user_description
      } = request.body
      const setData = {
        user_image: request.file === undefined ? '' : request.file.filename,
        user_name,
        user_jobdesc,
        user_location,
        user_workplace,
        user_description,
        user_updated_at: new Date()
      }
      const checkUser = await dataByIdModel(id)
      console.log(checkUser)
      fs.unlink(`uploads/workers/${checkUser[0].user_image}`, async (error) => {
        if (error) return helper.response(response, 400, 'gagal')
      })
      if (checkUser.length > 0) {
        const result = await settingWorkersModel(setData, id)
        console.log(result)
        return helper.response(response, 200, 'Data updated', result)
      } else {
        return helper.response(response, 404, `Data Not Found By Id ${id}`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  forgotPassword: async (request, response) => {
    try {
      console.log(request.body)
      const { user_email } = request.body
      const checkDataUser = await loginCheckModel(user_email)
      const keys = Math.round(Math.random() * 10000)
      if (checkDataUser.length >= 1) {
        const setData = {
          user_key: keys,
          user_updated_at: new Date()
        }
        await settingWorkersModel(setData, checkDataUser[0].user_id)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'kostkost169@gmail.com', // generated ethereal user
            pass: 'admin@123456' // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"Kerjain.com 👻" <Kerjain@gmail.com', // sender address
          to: user_email, // list of receivers
          subject: 'Kerjain.com - Forgot Password', // Subject line
          html: `<p>To Account   ${user_email}</p>
          <p>Hello I am milla personal team from Kerjain.com will help you to change your new password, please activate it on this page</p>
          <a href=" http://localhost:8080/forgotpassword/keys=${keys}">Click Here To Change Password</a>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(response, 400, 'Email not send !')
          } else {
            console.log(info)
            return helper.response(response, 200, 'Email has been send !')
          }
        })
      } else {
        return helper.response(response, 400, 'Email / Account not Registed !')
      }
    } catch (error) {
      console.log(error)
    }
  },
  resetPassword: async (request, response) => {
    try {
      console.log(request.body)
      const { key, newPassword, confirmPassword } = request.body
      if (newPassword.length < 8 || newPassword.length > 16) {
        return helper.response(
          response,
          400,
          'Password must be 8-16 characters long'
        )
      } else if (newPassword !== confirmPassword) {
        return helper.response(
          response,
          400,
          `Password didn't match ${newPassword}`
        )
      } else {
        const getKeys = await getUserByKeyModel(key)
        console.log(getKeys)
        if (getKeys.length < 1) {
          return helper.response(response, 400, 'Bad Request')
        } else {
          const userId = getKeys[0].user_id
          const update = new Date() - getKeys[0].user_updated_at
          const changeKeys = Math.floor(update / 1000 / 60)
          if (changeKeys >= 5) {
            const setData = {
              user_key: 0,
              user_updated_at: new Date()
            }
            await settingWorkersModel(setData, userId)
            return helper.response(
              response,
              400,
              'Please confirm password again, keys is expires :))'
            )
          } else {
            // new Password
            const salt = bcrypt.genSaltSync(7)
            const encryptPassword = bcrypt.hashSync(newPassword, salt)
            setData = {
              user_password: encryptPassword,
              user_key: 0,
              user_updated_at: new Date()
            }
            await settingWorkersModel(setData, userId)
            return helper.response(response, 200, 'Password Succes change yey')
          }
        }
      }
    } catch (error) {
      return helper(response, 400, 'Bad Request', error)
    }
  }
}
