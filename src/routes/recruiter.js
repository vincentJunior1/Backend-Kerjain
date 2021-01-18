const router = require('express').Router()
const uploadImage = require('../middleware/multer_recruiters')
// const { authRecruiter } = require('../middleware/auth')
const {
  dataRecruiter,
  dataById,
  registerRecruiter,
  loginRecruiter,
  forgotPassword,
  resetPassword,
  settingRecruiter
} = require('../controller/c_recruiter')

// ==> Recruiter <==
router.get('/', dataRecruiter)
router.get('/:id', dataById)
router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.post('/forgot', forgotPassword)
router.patch('/reset', resetPassword)
router.patch('/:id', uploadImage, settingRecruiter)
module.exports = router
