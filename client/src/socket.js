import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessagesWereSeen,
} from "./store/conversations";

const token = localStorage.getItem("messenger-token")

const socket = io(window.location.origin, {
  query: { token }
});

socket.on("connect", () => {
  // if token exists, then the user has succeeded logging in
  console.log("connected to server");
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", async (data) => {
    const activeConvo = await store.getState().activeConversation;
    store.dispatch(setNewMessage({ ...data, activeConvo, incomingMessage: true}));
  });
  socket.on("saw-messages", (data) => {
    const { convoId, receiverId } = data
    store.dispatch(setMessagesWereSeen(convoId, receiverId))
  })
});

export default socket;
