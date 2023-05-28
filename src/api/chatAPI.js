import axios from "axios";

export const startChat = async (systemMessage) => {
  return await axios.post("/api/chat/start", systemMessage);
};

export const sendMessage = async (chatList) => {
  return await axios.post("/api/chat/send", chatList);
};

export const summarizeChat = async (chatList) => {
  return await axios.post("/api/chat/summarize", chatList);
};

export const getKeywordList = async (chatList) => {
  return await axios.post("/api/chat/keyword", chatList);
};

export const translateKeyword = async (keyword) => {
  return await axios.get("/api/chat/translate", {
    params: { keyword },
  });
};
