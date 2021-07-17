import { seeAllMessages } from "./thunkCreators"
import store from "./../../store"
export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConvo, incomingMessage } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      totalNotSeen: 1,
      lastSeenId: -1,
      latestMessageText: message.text
    };
    return [newConvo, ...state];
  }

  return state.map((oldConvo) => {
    if (oldConvo.id === message.conversationId) {
      const convo = { ...oldConvo };
      if (incomingMessage) {
        const sameConvo = (message.senderId === convo.otherUser.id && activeConvo === convo.otherUser.username)
        if (sameConvo) {
          convo.lastSeenId = message.id
          store.dispatch(seeAllMessages(convo.otherUser.id, convo.id))

        } else {
        convo.totalNotSeen += 1
        }
      }
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return oldConvo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addSeenAllToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const newConvo = { ...convo }
      newConvo.totalNotSeen = 0
      newConvo.messages =
        newConvo.messages.map((message) => {
          message.isSeen = true
          return message
        })
      return newConvo;
    } else {
      return convo
    }
  })
}

// looks for last message sent by senderId in conversationId, modifying the
// state by adding lastSeenId (could be null) which will then be used by image
export const setLastSeenToStore = (state, {senderId, conversationId}) => {
  return state.map((convo) => {
    if (convo.id !== conversationId) {
      return convo
    }
    let lastSeenId = null;
    convo.forEach((message) => {
      if (message.senderId === senderId) {
        lastSeenId = message.id
      }
    })
    return {...convo, lastSeenId}
  })


}
