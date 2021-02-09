const helper = require('../helper/response')
const {
  sendChatModel,
  createRoomChat,
  getAllRoomchat,
  getDetailDataRoomChat,
  getLastMessage,
  postNotif,
  getNotifById,
  countUnreadNotif,
  patchNotifStatus
} = require('../model/m_hiring')
module.exports = {
  sendJobInvitation: async (req, res) => {
    try {
      const { perpose, email, name, phone, deskripsi, user_id_to } = req.body
      const { user_id } = res.token
      const sendMessage = `halo perkenalkan nama saya ${name} saya ingin menawarkan ${perpose} ${deskripsi} jika anda tertarik dapat menghubungi di ${phone} atau email di ${email}`
      const roomNumber = Math.floor(Math.random() * 9999)
      const roomChat = {
        room_chat: roomNumber,
        user_id_from: user_id,
        user_id_to
      }
      await createRoomChat(roomChat)
      const roomChats = {
        room_chat: roomNumber,
        user_id_to: user_id,
        user_id_from: user_id_to
      }
      await createRoomChat(roomChats)
      const data = {
        chat_content: sendMessage,
        room_chat: roomChat.room_chat,
        user_id_from: user_id,
        user_id_to
      }
      const result = await sendChatModel(data)
      return helper.response(res, 200, 'Success Send Invitation', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, "Can't Send Message", error)
    }
  },
  getAllChat: async (req, res) => {
    try {
      const { user_id } = res.token
      const result = await getAllRoomchat(user_id)
      console.log(result)
      for (let i = 0; i <= result.length - 1; i++) {
        let temp = []
        temp = await getLastMessage(result[i].room_chat)
        result[i].lastMessage = temp[0].chat_content
        console.log(temp)
      }
      return helper.response(res, 200, 'Success Get All Data Chat', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Data Not Found', error)
    }
  },
  getDataChatPerRoom: async (req, res) => {
    try {
      const { id } = req.params
      const { user_id } = res.token
      console.log(user_id)
      const result = await getDetailDataRoomChat(id, user_id)
      return helper.response(
        res,
        200,
        'Success Get Detail Data Room Chat',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Data Not Found', error)
    }
  },
  sendMessage: async (req, res) => {
    try {
      const { chat_content, user_id_to } = req.body
      const { id } = req.params
      const { user_id } = res.token
      const dataChat = {
        room_chat: id,
        chat_content,
        user_id_from: user_id,
        user_id_to
      }
      console.log(dataChat)
      const result = await sendChatModel(dataChat)
      return helper.response(res, 200, 'Success Send MEssage', result)
    } catch (error) {
      return helper.response(res, 400, "Can't send Message", error)
    }
  },
  postNotif: async (req, res) => {
    try {
      const { notif_to_id, notif_from, notif_purpose } = req.body

      if ((!notif_to_id, !notif_from, !notif_purpose)) {
        return helper.response(
          response,
          400,
          'please fill all form before sent hiring'
        )
      }

      const setData = {
        notif_to_id,
        notif_from,
        notif_purpose
      }

      console.log(setData)

      const result = await postNotif(setData)
      return helper.response(res, 200, 'notification sent', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getNotifById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getNotifById(id)
      return helper.response(res, 200, 'Success Get All notification', result)
    } catch (error) {
      return helper.response(res, 404, 'Data Not Found', error)
    }
  },
  countUnreadNotif: async (req, res) => {
    try {
      const { id } = req.params
      const result = await countUnreadNotif(id)
      return helper.response(res, 200, 'Success count notification', result)
    } catch (error) {
      return helper.response(res, 404, 'Data Not Found', error)
    }
  },
  patchNotifStatus: async (req, res) => {
    try {
      const { id } = req.params
      const result = await patchNotifStatus(id)
      return helper.response(
        res,
        200,
        'Success patch notification status',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Data Not Found', error)
    }
  }
}
