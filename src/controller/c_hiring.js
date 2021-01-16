const helper = require('../helper/response')
const { sendJobModel, createRoomChat } = require('../model/m_hiring')
module.exports = {
  sendJobInvitation: async (req, res) => {
    try {
      const { perpose, email, name, phone, deskripsi } = req.body
      const sendMessage = `halo perkenalkan nama saya ${name} saya ingin menawarkan ${perpose} ${deskripsi} jika anda tertarik dapat menghubungi di ${phone} atau email di ${email}`
      const roomChat = { room_chat: Math.floor(Math.random() * 9999) }
      await createRoomChat(roomChat)
      const data = {
        chat_content: sendMessage,
        chat_room: roomChat.room_chat,
        user_id_from: 1,
        user_id_to: 1
      }
      const result = await sendJobModel(data)
      return helper.response(res, 200, 'Success Send Invitation', result)
    } catch (error) {
      console.log(error)
    }
  },
  sendMessage: (req, res) => {
    try {
      console.log(req.body)
    } catch (error) {
      console.log(error)
    }
  }
}
