const router = require('express').Router()
const {
  getPorto,
  getPortoByUserId,
  postPorto,
  patchPorto,
  deletePorto
} = require('../controller/c_porto')
const uploadImage = require('../middleware/multer_porto')

router.get('/', getPorto)
router.get('/:id', getPortoByUserId)
router.post('/', uploadImage, postPorto)
router.patch('/:id', uploadImage, patchPorto)
router.delete('/:id', deletePorto)

module.exports = router
