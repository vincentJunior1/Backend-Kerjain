const router = require('express').Router()
const {
  getSkillPerUser,
  getAllSkillAllUser,
  postSkill,
  postSkills,
  patchSkill,
  deleteSkill
} = require('../controller/c_skill')

router.get('/user/skill/:id', getSkillPerUser)
router.get('/skill', getAllSkillAllUser)
router.post('/skills', postSkills)
router.post('/skill', postSkill)
router.patch('/skill/:id', patchSkill)
router.delete('/skill/:id', deleteSkill)

module.exports = router
