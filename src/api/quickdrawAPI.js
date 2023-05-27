import axios from "axios";

export const getImageByKeyword = async (keywordList) => {
  return await axios.post("http://127.0.0.1:8080/keyword-image", keywordList);
};
