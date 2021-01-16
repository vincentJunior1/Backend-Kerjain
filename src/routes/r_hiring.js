const router = require('express').Router()
const { sendJobInvitation } = require('../controller/c_hiring')

router.post('/jobinvitation', sendJobInvitation)

module.exports = router
