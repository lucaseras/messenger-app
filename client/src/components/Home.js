import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
  },
}));

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const prevUserRef = useRef();

  useEffect(() => {
      dispatch(fetchConversations());
    }, [dispatch]); 

  // if user changes, then we update the reference
  useEffect(() => {
    prevUserRef.current = user;
  }, [user])

  const prevUser = prevUserRef.current

  useEffect(() => {
    if (prevUser && user.id !== prevUser.id) {
      setIsLoggedIn(true);
    }
  }, [prevUser, user]);

  const handleLogout = async () => {
    dispatch(logout(user.id));
    dispatch(clearOnLogout())
  };

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
}

export default Home;
