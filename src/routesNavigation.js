const router = require('express').Router()
const workers = require('./routes/workers')
const recruiter = require('./routes/recruiter')
const home = require('./routes/rHome')
const porto = require('./routes/porto')
const skill = require('./routes/r_skill')

router.use('/workers', workers)
router.use('/recruiter', recruiter)
router.use('/home', home)
router.use('/porto', porto)
router.use('/skill', skill)

module.exports = router
