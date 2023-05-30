import axios from "axios";

const baseUrl = "http://44.216.2.85:5000";

export const startChat = async (systemMessage) => {
  return await axios.post(`${baseUrl}/api/chat/start`, systemMessage);
};

export const sendMessage = async (chatList) => {
  return await axios.post(`${baseUrl}/api/chat/send`, chatList);
};

export const summarizeChat = async (chatList) => {
  return await axios.post(`${baseUrl}/api/chat/summarize`, chatList);
};

export const getKeywordList = async (chatList) => {
  return await axios.post(`${baseUrl}/api/chat/keyword`, chatList);
};

export const translateKeyword = async (keyword) => {
  return await axios.get(`${baseUrl}/api/chat/translate`, {
    params: { keyword },
  });
};
