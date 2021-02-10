const multer = require('multer')
const helper = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/recruiter')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Extension File Must Be PNG or JPG'), false)
  }
}

const maxSize = 1024 * 2 * 1024
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
}).single('user_image')

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message)
    } else if (err) {
      return helper.response(response, 400, err.message)
    }
    next()
  })
}
module.exports = uploadFilter
