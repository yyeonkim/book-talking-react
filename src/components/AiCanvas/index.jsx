import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import "./style.css";
import talkingProfile from "../../assets/talking_profile.png";
import { getKeywordList, translateKeyword } from "../../api/chatAPI";
import { getImageByKeyword } from "../../api/quickdrawAPI";
import { imageCoordListState, isCopyState } from "../../recoil/drawing/atom";

const baseMessage =
  "위 이야기에서 다섯 개의 키워드를 영어로 알려줘. 부연 설명 하지 말고, 아래처럼 배열 형태로 알려줘.\nanswer: [word1, word2, word3, word4, word5]";
const retryMessage = `다른 단어로 알려줘. ${baseMessage}`;

function AiCanvas() {
  const {
    state: { story, title },
  } = useLocation();

  const canvasRef = useRef(null);
  const parentOfCanvasRef = useRef(null);
  const [pathList, setPathList] = useState([]);
  const [drawingName, setDrawingName] = useState("");
  const setImageCoordList = useSetRecoilState(imageCoordListState);
  const setIsCopy = useSetRecoilState(isCopyState);

  useEffect(() => {
    /* 캔버스 기본 설정 */
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    const parentWidth = parentOfCanvasRef.current.offsetWidth;
    const parentHeight = parentOfCanvasRef.current.offsetHeight;
    const startPoint = [parentWidth / 4, parentHeight / 4];
    // 캔버스 부모 요소의 width, height를 캔버스 크기로 지정
    canvas.width = parentWidth;
    canvas.height = parentHeight;
    // context 초기 스타일 지정
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";

    /* 동화 키워드로 관련 그림 가져오기 */
    (async () => {
      let chatList = [
        {
          role: "user",
          content: `${story}\n\n${baseMessage}`,
        },
      ];
      let imageRes;

      // 관련 그림이 있을 때까지 키워드 계속 추출
      while (true) {
        const res = await getKeywordList(chatList);
        const keywordList = stringToArray(res.data.content); // 문자를 배열로 바꾸기
        imageRes = await getImageByKeyword(keywordList);

        // 실패하면 메시지를 추가하고 다시 키워드 요청
        if (imageRes.message === "fail") {
          chatList.push(res.data, {
            role: "user",
            content: retryMessage,
          });
          continue;
        }
        break;
      }

      const coordinates = imageRes.data._drawing_data.image; // 그림 드로잉 좌표
      const keyword = imageRes.data._name; // 그림의 키워드
      // 영어 단어를 한글로 가져오기
      const res = await translateKeyword(keyword);
      setDrawingName(res.data.content);
      // 이미지 좌표로 그림 그리기
      drawOnAiCanvas({ coordinates, startPoint, ctx });
      setImageCoordList(coordinates);
    })();
  }, []);

  /* 배열 형태의 문자를 실제 배열로 변환 */
  const stringToArray = (str) => {
    return str
      .slice(9, -1)
      .split(",")
      .map((keyword) => keyword.trim());
  };

  /* 시작점부터 좌표에 따라 그림 표시하기 */
  const drawOnAiCanvas = ({ coordinates, startPoint, ctx }) => {
    const [startX, startY] = startPoint;
    for (const [xList, yList] of coordinates) {
      const aiPath = new Path2D();

      for (let i = 0; i < xList.length; i++) {
        aiPath.lineTo(xList[i] + startX, yList[i] + startY); // 선 연결
        ctx.stroke(aiPath); // 선 그리기
      }
      setPathList((current) => [...current, aiPath]);
    }
  };

  const onClick = () => {
    // 사용자 캔버스로 그림 가져오기
    setIsCopy(true);
  };

  return (
    <div className="AiCanvas">
      <div className="AiCanvas__chat">
        <img src={talkingProfile} alt="토킹 프로필 사진" />
        <div className="chat__text">
          <span>우리 이야기에 어울리는 그림을 그려보자.</span>
          {drawingName !== "" && (
            <span>나는 "{drawingName}"을/를 그려봤어. 어때?</span>
          )}
        </div>
      </div>
      <div className="AiCanvas__canvas" ref={parentOfCanvasRef}>
        <canvas className="canvas__drawing" ref={canvasRef} />
        {pathList.length === 0 ? (
          <div className="canvas__loader">. . .</div>
        ) : (
          <button className="canvas__copyButton" onClick={onClick}>
            가져오기
          </button>
        )}
      </div>
      <div className="AiCanvas__story">
        <h3>{`제목: ${title}`}</h3>
        <p>{story}</p>
      </div>
    </div>
  );
}

export default AiCanvas;
