import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setLastSeen,
} from "./store/conversations";

const socket = io(window.location.origin);

const token = localStorage.getItem("messenger-token")

socket.on("connect", () => {
  // if token exists, then the user has succeeded logging in
  if (token) {
    console.log("connected to server");
    socket.on("add-online-user", (id) => {
      store.dispatch(addOnlineUser(id));
    });

    socket.on("remove-offline-user", (id) => {
      store.dispatch(removeOfflineUser(id));
    });
    socket.on("new-message", async (data) => {
      const activeConvo = await store.getState().activeConversation;
      const currentUser = await store.getState().user;
      if (currentUser.id === data.recipientId) {
        store.dispatch(setNewMessage({ ...data, activeConvo, incomingMessage: true}));
      }
    });
    socket.on("seen-last-message", (data) => {
      store.dispatch(setLastSeen(data));
      //store.dispatch(setNewMessage(data.message, data.sender));
    });
  }
});

export default socket;
