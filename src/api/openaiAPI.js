import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getSystemResponse = async () => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a Korean elementary student. Your task is to talk about a story with elementary students. Your main objective is to ask a question that assumes particular situation in the story to help elementary students to rewrite a short story. If the user answers your question, you also answer simply and then ask next question. Ask one question at a time and don't say in English. For your first assignment, you are tasked with saying hello to 영희, asking her what book she read recently.",
      },
    ],
  });
};
