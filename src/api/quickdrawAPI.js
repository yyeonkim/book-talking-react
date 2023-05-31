import axios from "axios";

export const getImageByKeyword = async (keywordList) => {
  try {
    const response = await axios.post(
      "http://3.90.108.72:80/api/keyword-image",
      {
        keywords: keywordList,
      }
    );
    if (response.status === 200) {
      return { message: "success", data: response.data };
    }
    throw Error();
  } catch (error) {
    return { message: "fail" };
  }
};
