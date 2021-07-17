import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat} from "../../store/activeConversation";
import { seeAllMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
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
};

const Chat = (props) => {
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.seeAllMessages(conversation.otherUser.id, conversation.id);
  };
    const { classes } = props;
    const otherUser = props.conversation.otherUser;

    return (
      <Box
        onClick={() => handleClick(props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={props.conversation} />
      </Box>
    );

}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    seeAllMessages: (otherId, conversationId) => {
      dispatch(seeAllMessages(otherId, conversationId));
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
