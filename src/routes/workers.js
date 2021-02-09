const router = require('express').Router()
const uploadImage = require('../middleware/multer_workers')
// const { authWorkers } = require('../middleware/auth')
const {
  registerWorkers,
  loginUser,
  DataWorkers,
  dataById,
  settingWorkers,
  forgotPassword,
  resetPassword,
  changePassword,
  activationUser
} = require('../controller/c_workers')
const {
  getAllExpModel,
  getById,
  postExp,
  patchExp,
  deleteExp
} = require('../controller/c_exp')

//  ==> Workers <==
router.get('/', DataWorkers)
router.get('/:id', dataById)
router.post('/register', registerWorkers)
router.post('/login', loginUser)
router.post('/forgot', forgotPassword)
router.patch('/reset', resetPassword)
router.patch('/:id', uploadImage, settingWorkers)
router.patch('/newPassword/:id', changePassword)
router.patch('/activate/email/:keys', activationUser)

// ==> exprerience <==
router.get('/getexprerience', getAllExpModel)
router.get('/getexprerience/:id', getById)
router.post('/addExp', postExp)
router.patch('/exprerience/:id', patchExp)
router.delete('/exprerience/:id', deleteExp)
module.exports = router
