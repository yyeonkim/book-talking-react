import axios from "axios";

export const startChat = async () => {
  const res = await axios.get("/api/chat/start");
  return res;
};

export const sendMessage = async (chatList) => {
  const res = await axios.post("/api/chat/send", chatList);
  return res;
};
