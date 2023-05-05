import axios from "axios";

export const startChat = async () => {
  return await axios.get("/api/chat/start");
};

export const sendMessage = async (chatList) => {
  return await axios.post("/api/chat/send", chatList);
};

export const summarizeChat = async (chatList) => {
  return await axios.post("/api/chat/summarize", chatList);
};
