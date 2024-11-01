import axios from "axios";

// const baseUrl = "http://35.172.220.99:5000";

export const getImageByKeyword = async (keywordList) => {
  try {
    const response = await axios.post("/api/keyword-image", {
      keywords: keywordList,
    });
    if (response.status === 200) {
      return { message: "success", data: response.data };
    }
    throw Error();
  } catch (error) {
    return { message: "fail" };
  }
};
