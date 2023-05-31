import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useRef } from "react";

import "./style.css";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../recoil/drawing/atom";

function CompletePage() {
  const {
    state: { story, title, image },
  } = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const username = useRecoilValue(usernameState);

  const downloadImage = () => {
    const target = canvasRef.current;
    // 크기 키우기
    target.style.transform = "scale(2)";
    // 이미지로 다운로드
    html2canvas(target).then((canvas) => {
      // blob으로 변환 (모바일 웹에서 다운받으려면 blob 또는 URI)
      canvas.toBlob((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `booktalking_${Date.now()}`;
        a.click();
        // 크기 다시 줄이기
        target.style.transform = "scale(1)";
      });
    });
  };

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="CompletePage">
      <h1>{username}의 동화가 완성됐어요</h1>
      <p>
        ‘동화 저장하기’를 눌러 완성된 동화를 이미지로 다운받으세요. <br /> 다른
        동화도 만들고 싶으면 ‘다른 동화 만들기’를 클릭해주세요.
      </p>
      <div className="CompletePage__story" ref={canvasRef}>
        <div className="story__background">
          <div className="story__text">
            <h1>{title}</h1>
            <p>{story}</p>
          </div>
          <img className="story__image" src={image} alt="캔버스 그림" />
        </div>
      </div>
      <div className="CompletePage__buttonSection">
        <button
          className="CompletePage__button CompletePage__button--yellow"
          onClick={downloadImage}
        >
          동화 저장하기
        </button>
        <button
          className="CompletePage__button CompletePage__button--grey"
          onClick={navigateToChat}
        >
          다른 동화 만들기
        </button>
      </div>
    </div>
  );
}

export default CompletePage;
