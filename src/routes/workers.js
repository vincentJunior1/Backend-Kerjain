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
  resetPassword
} = require('../controller/c_workers')
const { getExp, postExp, patchExp, deleteExp } = require('../controller/c_exp')

//  ==> Workers <==
router.get('/', DataWorkers)
router.get('/:id', dataById)
router.post('/register', registerWorkers)
router.post('/login', loginUser)
router.post('/forgot', forgotPassword)
router.patch('/reset', resetPassword)
router.patch('/:id', uploadImage, settingWorkers)

// ==> exprerience <==
router.get('/getexprerience/:id', getExp)
router.post('/addExp', postExp)
router.patch('/exprerience/:id', patchExp)
router.delete('/exprerience/:id', deleteExp)
module.exports = router
