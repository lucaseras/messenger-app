import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: totalNotSeen => !totalNotSeen > 0 && "#9CADC8",
    letterSpacing: -0.17,
    fontWeight: totalNotSeen => totalNotSeen > 0
    ? 600
    : 200,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  totalNotSeen: {
    height: 18,
    minWidth: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A8DFF",
    marginRight: 10,
    color: "white",
    fontSize: 11,
    fontWeight: "Bold",
    borderRadius: "50%",
  },
}));

const ChatContent = (props) => {
  const { conversation } = props;
  const { latestMessageText, otherUser, totalNotSeen } = conversation;

  const classes = useStyles(totalNotSeen);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
        { totalNotSeen > 0 && 
        <Typography className={classes.totalNotSeen}> {totalNotSeen} </Typography>
        }
    </Box>
  );
};

export default ChatContent;
