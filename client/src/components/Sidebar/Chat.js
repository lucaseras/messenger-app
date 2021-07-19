import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat} from "../../store/activeConversation";
import { seeAllMessages } from "../../store/utils/thunkCreators";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Chat = ({ conversation }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = (conversation) => {
    dispatch(setActiveChat(conversation.otherUser.username));
    dispatch(seeAllMessages(conversation.otherUser.id, conversation.id));
  };
    const otherUser = conversation.otherUser;

    return (
      <Box
        onClick={() => handleClick(conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={conversation} />
      </Box>
    );
}

export default Chat;
