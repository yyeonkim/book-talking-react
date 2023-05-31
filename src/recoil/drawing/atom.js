import { atom } from "recoil";

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

// drawingPage에서 사용자가 '가져오기' 클릭하면 true로 변경
// true이면 사용자 캔버스에 드로잉 붙여넣기
export const isCopyState = atom({
  key: "isCopyState",
  default: false,
});

export const imageCoordListState = atom({
  key: "imageCoordListState",
  default: [],
});
