import { createContext, useContext, useReducer } from "react";

const ChatContext = createContext(null);
const ChatDispatchContext = createContext(null);

export default function ChatProvider({ children }) {
  const [chatList, chatListDispatch] = useReducer(chatListReducer, []);

  return (
    <ChatContext.Provider value={chatList}>
      <ChatDispatchContext.Provider value={chatListDispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}

const chatListReducer = (itemList, action) => {
  switch (action.type) {
    case "init": {
      return [action.data];
    }
    case "add": {
      return [...itemList, action.data];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const useChatList = () => {
  return useContext(ChatContext);
};

export const useChatListDispatch = () => {
  return useContext(ChatDispatchContext);
};
