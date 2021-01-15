const router = require('Express').Router()
const { getJobseeker } = require('../controller/c_home')

router.get('/home', getJobseeker)

module.exports = router
