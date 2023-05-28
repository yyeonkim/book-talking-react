import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.css";
import { getKeywordList } from "../../api/chatAPI";
import { getImageByKeyword } from "../../api/quickdrawAPI";

function AiCanvas() {
  //      const {
  //     state: { story, title },
  //   } = useLocation();

  const canvasRef = useRef(null);
  const parentOfCanvasRef = useRef(null);
  const [pathList, setPathList] = useState([]);

  /* 캔버스 설정하기 */
  useEffect(() => {}, []);

  /* 동화 키워드로 관련 그림 가져오기 */
  useEffect(() => {
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

    (async () => {
      let keywordList = [];
      let aiDrawing = [];

      while (true) {
        keywordList = await getKeywordList({
          story:
            "영희는 최근에 '이상한 나라의 앨리스'를 읽고, 이상한 나라로 여행을 가고 싶어졌어요. 그녀는 체셔 고양이를 만나기 위해 여행을 하게 되었고, 준비물로는 체셔 고양이가 좋아하는 마들렌 케이크를 가져갔어요. 이제 영희와 체셔 고양이의 모험이 시작됐습니다! 체셔 고양이와 함께 이동하면서, 영희는 토끼도 만나기로 했어요. 그녀는 토끼를 쫓으며 무슨 일이 일어날까 기대하기도 하지만 길을 잃거나 무서워하기도 해요. 하지만 언제든지 엄마나 아빠에게 도움을 받으며 안전하게 여행할 수 있다면, 영희와 체셔 고양시의 모험은 계속 됩니다!",
        });
        const res = await getImageByKeyword(keywordList);

        if (res.message === "fail") {
          // 키워드 다시 받아오기
          continue;
        }
        aiDrawing = res.data._drawing_data.image;
        break;
      }

      // 좌표로 그림 그리기
      for (const [xList, yList] of aiDrawing) {
        const aiPath = new Path2D();
        for (let i = 0; i < xList.length; i++) {
          aiPath.lineTo(xList[i] + startPoint[0], yList[i] + startPoint[1]); // 선 연결
          ctx.stroke(aiPath); // 선 그리기
        }
        setPathList((current) => [...current, aiPath]);
      }
    })();
  }, []);

  return (
    <div className="AiCanvas" ref={parentOfCanvasRef}>
      <canvas className="AiCanvas__drawing" ref={canvasRef}></canvas>
      {pathList.length === 0 ? (
        <div className="AiCanvas_loader">. . .</div>
      ) : (
        <button className="AiCanvas__copyButton">가져오기</button>
      )}
    </div>
  );
}

export default AiCanvas;
