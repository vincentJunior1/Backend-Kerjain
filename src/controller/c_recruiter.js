const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')

const {
  registerRequiter,
  loginCheckModel,
  dataRecruiterModel,
  dataByIdModel,
  getUserByKeyModel,
  settingRecruiterModel
} = require('../model/m_recruiter')

module.exports = {
  dataRecruiter: async (request, response) => {
    try {
      const result = await dataRecruiterModel()
      return helper.response(response, 200, 'Success get data', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  dataById: async (request, response) => {
    try {
      const { id } = request.params

      let result
      if (id) {
        result = await dataByIdModel(id)
        if (result.length === 0) {
          return helper.response(
            response,
            404,
            `Reqruiment By Id : ${id} Not Found`
          )
        }
      } else {
        result = await dataRecruiterModel()
        if (result.length === 0) {
          return helper.response(response, 404, 'No data')
        }
      }
      return helper.response(response, 200, 'Success get data', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  registerRecruiter: async (request, response) => {
    try {
      const {
        user_name,
        user_email,
        user_phone,
        user_password,
        confirm_password
      } = request.body
      if (user_password !== confirm_password) {
        return helper.response(response, 400, 'Password not match')
      }
      const cekEmail = await loginCheckModel(user_email)
      if (cekEmail.length <= 0) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(user_password, salt)
        const keys = Math.floor(Math.random() * 9999)
        const setData = {
            user_key: keys,
            user_name,
            user_email,
            user_phone,
            user_role: 1,
            user_password: encryptPassword
          },
          transporter = nodemailer.createTransport({
            host: 'smtp.google.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
              user: 'skyrouterweb6@gmail.com', // generated ethereal user
              pass: 'skyrouter6'
            }
          })
        await transporter.sendMail({
          from: '"Team Kerjain.com"',
          to: user_email,
          subject: 'Kerjain.com - Activation Email',
          html: `<a href="${process.env.URL_FE}confirmationemail/${keys}">Click Here To Activate Your Account</a>`
        })
        await registerRequiter(setData)
        return helper.response(
          response,
          200,
          'Success register , check your email'
        )
      } else {
        return helper.response(response, 400, 'Email Already Registred')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, "Can't Register User", error)
    }
  },
  loginRecruiter: async (request, response) => {
    try {
      const { user_email, user_password } = request.body

      if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert email Please :)')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please :)')
      } else {
        const checkDataUser = await loginCheckModel(user_email)
        if (checkDataUser.length > 0) {
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          )
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
            return helper.response(response, 200, 'Success Login ', result)
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
  settingRecruiter: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_name,
        user_field,
        user_location,
        user_description,
        user_linkedin,
        user_phone,
        user_instagram
      } = request.body
      const setData = {
        user_name,
        user_field,
        user_location,
        user_description,
        user_linkedin,
        user_phone,
        user_instagram,
        user_updated_at: new Date()
      }
      const checkUser = await dataByIdModel(id)
      if (checkUser.length > 0) {
        const result = await settingRecruiterModel(setData, id)
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
      const { user_email } = request.body
      const checkDataUser = await loginCheckModel(user_email)
      const keys = Math.round(Math.random() * 10000)
      if (checkDataUser.length >= 1) {
        const setData = {
          user_key: keys,
          user_updated_at: new Date()
        }
        await settingRecruiterModel(setData, checkDataUser[0].user_id)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'skyrouterweb6@gmail.com', // generated ethereal user
            pass: 'skyrouter6' // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"Kerjain.com 👻" <Kerjain@gmail.com>', // sender address
          to: user_email, // list of receivers
          subject: 'Kerjain.com - Forgot Password', // Subject line
          html: `<a href=" ${process.env.URL_FE}forgotpassword/keys=${keys}">Click Here To Change Password</a>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return helper.response(response, 400, 'Email not send !')
          } else {
            return helper.response(response, 200, 'Email has been send !')
          }
        })
      } else {
        return helper.response(response, 400, 'Email / Account not Registed !')
      }
    } catch (error) {}
  },
  resetPassword: async (request, response) => {
    try {
      const { key, newPassword, confirmPassword } = request.body
      if (newPassword.length < 8 || newPassword.length > 16) {
        return helper.response(
          response,
          400,
          'Password must be 8-16 characters long'
        )
      } else if (newPassword !== confirmPassword) {
        return helper.response(response, 400, "Password didn't match")
      } else {
        const getKeys = await getUserByKeyModel(key)
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
            await settingRecruiterModel(setData, userId)
            return helper.response(
              response,
              400,
              'Please confirm password again, keys is expires :))'
            )
          } else {
            // new Password
            const salt = bcrypt.genSaltSync(7)
            const encryptPassword = bcrypt.hashSync(newPassword, salt)
            const setData = {
              user_password: encryptPassword,
              user_key: 0,
              user_updated_at: new Date()
            }
            await settingRecruiterModel(setData, userId)
            return helper.response(response, 200, 'Success change Password')
          }
        }
      }
    } catch (error) {
      return helper(response, 400, 'Bad Request', error)
    }
  }
}
