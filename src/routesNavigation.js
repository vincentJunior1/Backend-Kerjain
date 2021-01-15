const router = require('Express').Router()
// ==> Workers <==
const workers = require('./routes/workers')
router.use('/workers', workers)

// ==> Recruiter <==
const recruiter = require('./routes/recruiter')
router.use('/recruiter', recruiter)

// ==> Home <==
const home = require('./routes/home')
router.use('/home', home)

// ==> Profile <==
const porto = require('./routes/porto')
const skill = require('./routes/r_skill')
router.use('/porto', porto)
router.use('/skill', skill)
module.exports = router
