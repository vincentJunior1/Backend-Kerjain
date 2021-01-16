const router = require('Express').Router()
const {
  postContact,
  getContactById,
  updateContact,
  deleteContact,
  getAllContact,
  getAllUserContact
} = require('../controller/c_contact')

router.get('/contactusers', getAllUserContact)
router.post('/', postContact)
router.get('/:id', getContactById)
router.get('/', getAllContact)
router.patch('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router
