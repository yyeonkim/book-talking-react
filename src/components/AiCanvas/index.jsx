import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.css";
import { getKeywordList } from "../../api/chatAPI";
import { getImageByKeyword } from "../../api/quickdrawAPI";
import Loader from "../../components/Loader";

function AiCanvas() {
  //      const {
  //     state: { story, title },
  //   } = useLocation();

  const aiCanvasRef = useRef(null);
  const parentOfAiCanvasRef = useRef(null);
  const [aiDrawing, setAiDrawing] = useState([]);

  useEffect(() => {
    // 동화에서 키워드 추출
    getKeywordList({
      story:
        "영희는 최근에 '이상한 나라의 앨리스'를 읽고, 이상한 나라로 여행을 가고 싶어졌어요. 그녀는 체셔 고양이를 만나기 위해 여행을 하게 되었고, 준비물로는 체셔 고양이가 좋아하는 마들렌 케이크를 가져갔어요. 이제 영희와 체셔 고양이의 모험이 시작됐습니다! 체셔 고양이와 함께 이동하면서, 영희는 토끼도 만나기로 했어요. 그녀는 토끼를 쫓으며 무슨 일이 일어날까 기대하기도 하지만 길을 잃거나 무서워하기도 해요. 하지만 언제든지 엄마나 아빠에게 도움을 받으며 안전하게 여행할 수 있다면, 영희와 체셔 고양시의 모험은 계속 됩니다!",
    }).then(async (res) => {
      const keywordList = res.data.content.slice(9, -1).split(",");
      const response = await getImageByKeyword(keywordList);
      setAiDrawing(response.data._drawing_data.image);
    });
  }, []);

  return (
    <div className="AiCanvas" ref={parentOfAiCanvasRef}>
      <canvas className="AiCanvas__drawing" ref={aiCanvasRef}></canvas>
      <button className="AiCanvas__copyButton">가져오기</button>
    </div>
  );
}

export default AiCanvas;
