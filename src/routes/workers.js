const router = require('express').Router()
const uploadImage = require('../middleware/multer_workers')
// const { authPekerja } = require('../middleware/auth')
const {
  registerWorkers,
  loginUser,
  DataWorkers,
  dataById,
  settingWorkers,
  forgotPassword,
  resetPassword
} = require('../controller/c_workers')

// +Workers+
router.get('/', DataWorkers)
router.get('/:id', dataById)
router.post('/register', registerWorkers)
router.post('/login', loginUser)
router.post('/forgot', forgotPassword)
router.patch('/reset', resetPassword)
router.patch('/:id', uploadImage, settingWorkers)
module.exports = router
