const router = require("express").Router();
const  { Op } = require("sequelize");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const convoFromDatabase = await Conversation.findByPk(conversationId);

      // if the conversation in the database does not include the senderId, then
      // this conversation does not involve the sender
      if (convoFromDatabase.user1Id != senderId && convoFromDatabase.user2Id != senderId) {
        return res.sendStatus(403);
      }

      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
        
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects { seen, conversationId } in body (seen is the id of the person whose messages were
// seen)
router.post("/seen", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { otherUser, conversationId } = req.body;

    const convo = await Conversation.findByPk(conversationId)

    // now we update the messages sent by this recipient
    await Message.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          [Op.and]: {
            senderId: otherUser,
            conversationId: convo.id
          }
        }
      }
    )

    res.json(seen);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
