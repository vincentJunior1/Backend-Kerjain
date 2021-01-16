const router = require('express').Router()
const workers = require('./routes/workers')
const recruiter = require('./routes/recruiter')
const home = require('./routes/r_home')
const porto = require('./routes/porto')
const skill = require('./routes/r_skill')
const hiring = require('./routes/r_hiring')

router.use('/workers', workers)
router.use('/recruiter', recruiter)
router.use('/home', home)
router.use('/porto', porto)
router.use('/skill', skill)
router.use('/hiring', hiring)

module.exports = router
