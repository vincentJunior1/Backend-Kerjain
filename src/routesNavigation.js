const router = require('express').Router()

const workers = require('./routes/workers')
const recruiter = require('./routes/recruiter')
// const home = require('./routes/r_home')
const porto = require('./routes/porto')
const skill = require('./routes/r_skill')
const contact = require('./routes/r_contact')

router.use('/workers/porto', porto)
router.use('/workers', workers)
router.use('/recruiter', recruiter)
router.use('/recruiter', recruiter)

const home = require('./routes/rHome')
router.use('/home', home)

router.use('/', skill)
router.use('/contact', contact)

module.exports = router
