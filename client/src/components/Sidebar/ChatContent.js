import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
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
  anchorTopRight: {
      transform: "translate(-20px, 50%)"
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
      <Badge 
        className={classes.anchorTopRight} 
        badgeContent={totalNotSeen} 
        invisible={totalNotSeen <= 0}
        color="primary"/>
    </Box>
  );
};

export default ChatContent;
