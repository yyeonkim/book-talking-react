import axios from "axios";

export const startChat = async () => {
  const res = await axios.get("/api/chat/start");
  return res;
};

export const sendMessage = async (content) => {
  const res = await axios.post("/api/chat/send", { body: { content } });
  return res;
};
