const router = require('express').Router()
const { editPhoto } = require('../controller/c_editPhoto')
const uploadImage = require('../middleware/multer_workers')

router.patch('/:id', uploadImage, editPhoto)
module.exports = router
