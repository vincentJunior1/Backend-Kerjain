const router = require('express').Router()
const { getJobseeker } = require('../controller/c_home')

router.get('/home', getJobseeker)

module.exports = router
