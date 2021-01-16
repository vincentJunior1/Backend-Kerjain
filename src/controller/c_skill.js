const {
  getSkillPerUserModel,
  getAllSkillAllUserModel,
  postSkillModel,
  patchSkillModel,
  countSkillModel,
  deleteSkillModel,
  getSkillByIdSkillModel
} = require('../model/m_skill')

const helper = require('../helper/response')

module.exports = {
  getSkillPerUser: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getSkillPerUserModel(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get her/his skills', result)
      } else {
        return helper.response(res, 404, `Skill By User Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllSkillAllUser: async (req, res) => {
    try {
      console.log('masuk')
      const result = await getAllSkillAllUserModel()
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get  skills', result)
      } else {
        return helper.response(res, 404, 'Skill Not Found')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postSkill: async (req, res) => {
    try {
      const { user_id, skill_name } = req.body

      const setData = {
        user_id,
        skill_name,
        skill_created_at: new Date()
      }
      const result = await postSkillModel(setData)
      return helper.response(res, 200, 'Success Post Skill', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchSkill: async (req, res) => {
    try {
      const { id } = req.params
      let { skill_name } = req.body
      const countId = await countSkillModel(id)
      const checkId = await getSkillByIdSkillModel(id)
      console.log(checkId)
      if (countId > 0) {
        if (skill_name === '') {
          skill_name = checkId.skill_name
        }
        const setData = {
          skill_name,
          user_id: checkId.skill_id,
          skill_updated_at: new Date()
        }
        const result = await patchSkillModel(setData, id)
        return helper.response(res, 200, 'Success update skill', result)
      } else {
        return helper.response(
          res,
          404,
          'Skill is not found | Skill is not available'
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params
      const countId = await countSkillModel(id)
      if (countId > 0) {
        const result = await deleteSkillModel(id)
        return helper.response(res, 200, 'Skill has been deleted', result)
      } else {
        return helper.response(res, 404, 'Skill Is Not Available')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
