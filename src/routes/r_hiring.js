const router = require('express').Router()
const {
  sendJobInvitation,
  getAllChat,
  getDataChatPerRoom,
  sendMessage
} = require('../controller/c_hiring')
const { authorization } = require('../middleware/authChat')

router.post('/jobinvitation', sendJobInvitation)
router.get('/getallchat/:id', getAllChat)
router.get('/getdetailchat/:id', authorization, getDataChatPerRoom)
router.post('/getdetailchat/:id', sendMessage)

module.exports = router
