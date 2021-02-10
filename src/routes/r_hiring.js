const router = require('express').Router()
const {
  sendJobInvitation,
  getAllChat,
  getDataChatPerRoom,
  sendMessage,
  postNotif,
  getNotifById,
  countUnreadNotif,
  patchNotifStatus
} = require('../controller/c_hiring')
const { authorization } = require('../middleware/authChat')

router.post('/jobinvitation', authorization, sendJobInvitation)
router.get('/getallchat/', authorization, getAllChat)
router.get('/getdetailchat/:id', authorization, getDataChatPerRoom)
router.post('/getdetailchat/:id', authorization, sendMessage)
router.post('/notif', postNotif)
router.get('/notif/get/:id', getNotifById)
router.get('/notif/count/:id', countUnreadNotif)
router.patch('/notif/patch/:id', patchNotifStatus)

module.exports = router
