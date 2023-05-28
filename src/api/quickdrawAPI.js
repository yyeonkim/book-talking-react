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
      return { message: "success", data: response.data };
    } else if (response.status === 404) {
      return { message: "fail" };
    } else {
      throw Error();
    }
  } catch (error) {
    console.error(error);
  }
};
