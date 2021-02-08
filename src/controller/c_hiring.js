const helper = require('../helper/response')
const {
  sendChatModel,
  createRoomChat,
  getAllRoomchat,
  getDetailDataRoomChat,
  getLastMessage
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
      return helper.response(res, 400, "Can't Send Message", error)
    }
  },
  getAllChat: async (req, res) => {
    try {
      const { user_id } = res.token
      const result = await getAllRoomchat(user_id)
      for (let i = 0; i <= result.length - 1; i++) {
        let temp = []
        temp = await getLastMessage(result[i].room_chat)
        result[i].lastMessage = temp[0].chat_content
      }
      return helper.response(res, 200, 'Success Get All Data Chat', result)
    } catch (error) {
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
  }
}
