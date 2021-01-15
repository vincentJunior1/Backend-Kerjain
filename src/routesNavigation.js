const router = require('Express').Router()
// ==> User router
const user = require('./routes/user')
router.use('/user', user)

// ==> Home
const home = require('./routes/r_home')
router.use('/', home)

// ==> Home
const skill = require('./routes/r_skill')
router.use('/', skill)

module.exports = router
