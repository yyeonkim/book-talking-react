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

export const getKeywordList = async (story) => {
  const res = await axios.post("/api/chat/keyword", story);
  return res.data.content.slice(9, -1).split(","); // 문자 배열로 변환
};
