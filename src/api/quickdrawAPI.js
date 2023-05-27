import axios from "axios";

export const getImageByKeyword = async (keywordList) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/api/keyword-image",
      {
        keywords: keywordList,
      }
    );
    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      console.log("try again");
      // 새로운 키워드 받아오기
      return;
    } else {
      throw Error();
    }
  } catch (error) {
    console.error(error);
  }
};
