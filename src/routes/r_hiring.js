const router = require('express').Router()
const {
  sendJobInvitation,
  getAllChat,
  getDataChatPerRoom,
  sendMessage
} = require('../controller/c_hiring')
const { authorization } = require('../middleware/authChat')

router.post('/jobinvitation', authorization, sendJobInvitation)
router.get('/getallchat/', authorization, getAllChat)
router.get('/getdetailchat/:id', authorization, getDataChatPerRoom)
router.post('/getdetailchat/:id', authorization, sendMessage)

module.exports = router
