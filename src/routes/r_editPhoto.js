const router = require('express').Router()
const { editPhoto } = require('../controller/c_editPhoto')
const { authorization } = require('../middleware/authChat')
const uploadImage = require('../middleware/multer_workers')

router.patch('/:id', authorization, uploadImage, editPhoto)
module.exports = router
