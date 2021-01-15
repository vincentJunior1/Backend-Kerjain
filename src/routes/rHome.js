const router = require('express').Router()
const { getJobseeker } = require('../controller/cHome')

router.get('/', getJobseeker)

module.exports = router
