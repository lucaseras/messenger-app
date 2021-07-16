import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findLastReadIndex = (messages, userId) => {
  let res = -1
  for (let index = 0; index < messages.length; index++){
    let message = messages[index]
    if (message.senderId === userId && !message.isSeen) {
      res = index
      break
    }
  }

  return res
}

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadIndex = findLastReadIndex(messages, userId)
  
  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble 
            key={message.id} 
            text={message.text} 
            time={time} 
            otherUser={otherUser}
            lastSeen={lastReadIndex === index}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
