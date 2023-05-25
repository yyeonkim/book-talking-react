import { RiPencilFill, RiEraserFill, RiPaintFill } from "react-icons/ri";

import "./style.css";
import talkingProfile from "../../assets/talking_profile.png";
import Loader from "../../components/Loader";

function DrawingPage() {
  return (
    <div className="DrawingPage">
      <div className="DrawingPage__left">
        <div className="left__ai">
          <img src={talkingProfile} alt="토킹 프로필 사진" />{" "}
          <span>우리 이야기에 어울리는 그림을 그려보자.</span>
        </div>
        <div className="left__canvas">
          <div className="canvas__drawing"></div>
          <button className="canvas__copyButton">가져오기</button>
        </div>
        <p className="left__story">
          영희는 최근에 '이상한 나라의 앨리스'를 읽고, 이상한 나라로 여행을 가고
          싶어졌어요. 그녀는 체셔 고양이를 만나기 위해 여행을 하게 되었고,
          준비물로는 체셔 고양이가 좋아하는 마들렌 케이크를 가져갔어요. 이제
          영희와 체셔 고양이의 모험이 시작됐습니다! 체셔 고양이와 함께
          이동하면서, 영희는 토끼도 만나기로 했어요. 그녀는 토끼를 쫓으며 무슨
          일이 일어날까 기대하기도 하지만 길을 잃거나 무서워하기도 해요. 하지만
          언제든지 엄마나 아빠에게 도움을 받으며 안전하게 여행할 수 있다면,
          영희와 체셔 고양시의 모험은 계속 됩니다!
        </p>
      </div>
      <div className="DrawingPage__right">
        <div className="right__tool">
          <div className="tool__action">
            <RiPencilFill className="tool__icon" />
            <RiEraserFill className="tool__icon" />
            <RiPaintFill className="tool__icon" />
          </div>
          <div className="tool_colorPalette">
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
            <div className="colorPalette__color"></div>
          </div>
        </div>
        <div className="right__canvas"></div>
      </div>
    </div>
  );
}

export default DrawingPage;
