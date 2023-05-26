import { RiPencilFill, RiEraserFill, RiPaintFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

import "./style.css";
import talkingProfile from "../../assets/talking_profile.png";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";
import { getKeywordList } from "../../api/chatAPI";

/* 그리기 모드 */
const Action = {
  Pencil: "pencil",
  Eraser: "eraser",
  Paint: "paint",
};

const ColorPalette = {
  Black: "#000",
  Red: "#e12828",
  Orange: "#ffa843",
  Yellow: "#ffe600",
  Green: "#2bc91d",
  Skyblue: "#2abdeb",
  Blue: "#3d4bc9",
  Pupple: "#a43fe1",
  Pink: "#ef78a3",
  Grey: "#818181",
};

function DrawingPage() {
  const {
    state: { story, title },
  } = useLocation();
  const [keywordList, setKeywordList] = useState([]);

  useEffect(() => {
    // 동화에서 키워드 추출
    getKeywordList(story).then((res) => console.log(res.data));
  }, [story]);

  const canvasRef = useRef(null);
  const parentOfCanvasRef = useRef(null); // 캔버스 부모 요소
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);

  const [path, setPath] = useState(new Path2D());
  const [pathList, setPathList] = useState([]);

  const [action, setAction] = useState(Action.Pencil); // 그리기 액션 (pencil, eraser, paint)
  const [drawing, setDrawing] = useState(false); // 그리는 중이면 true 아니면 false
  const [erasing, setErasing] = useState(false); // 지우는 중이면 true 아니면 false

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    // 캔버스 부모 요소의 width, height를 캔버스 크기로 지정
    canvas.width = parentOfCanvasRef.current.offsetWidth;
    canvas.height = parentOfCanvasRef.current.offsetHeight;
    // context 초기 스타일 지정
    ctx.lineWidth = 1;
    ctx.strokeStyle = ColorPalette.Black;
    ctx.fillStyle = ColorPalette.Black;
    // state 저장
    setCtx(ctx);
    setCanvas(canvas);
  }, [setCanvas]);

  const onClickAction = (event) => {
    const target = event.target;
    let action = "";
    if (target.tagName === "svg") {
      action = target.dataset.action;
    } else if (target.tagName === "path") {
      action = target.parentElement.parentElement.dataset.action;
    }
    setAction(action);
  };

  const startDrawing = () => {
    if (action === Action.Pencil) {
      setDrawing(true);
      setPath(new Path2D()); // 그리기 시작할 때, 새 path 객체 생성
    }
  };

  const stopDrawing = () => {
    if (action === Action.Pencil) {
      setDrawing(false);
      // 마우스를 떼면 그린 path 저장
      setPathList((current) => [...current, path]);
    }
  };

  /* 선 그리기 */
  const draw = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (drawing) {
      path.lineTo(offsetX, offsetY); // 시작점과 현재 좌표 연결
      ctx.stroke(path); // 선 그리기
    } else {
      path.moveTo(offsetX, offsetY); // 시작점 옮기기
    }
  };

  const paint = (event) => {
    if (action === Action.Paint) {
      const { offsetX, offsetY } = event.nativeEvent;

      // 클릭한 path 찾기
      for (const p of pathList) {
        const isPointInPath = ctx.isPointInPath(p, offsetX, offsetY);
        if (isPointInPath) {
          // 해당 path 내부 채우기
          ctx.fill(p);
          break;
        }
      }
    }
  };

  const onClickPalette = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  };

  const onClickComplete = (event) => {
    // 그림 완성 의사 묻기
  };

  return (
    <div className="DrawingPage">
      <div className="DrawingPage__left">
        <div className="left__ai">
          <img src={talkingProfile} alt="토킹 프로필 사진" />
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
          <div className="tool__action" onClick={onClickAction}>
            <RiPencilFill
              id="tool__icon--selected"
              className="tool__icon"
              data-action={Action.Pencil}
            />
            <RiEraserFill className="tool__icon" data-action={Action.Eraser} />
            <RiPaintFill className="tool__icon" data-action={Action.Paint} />
          </div>
          <div className="tool_colorPalette" onClick={onClickPalette}>
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Black }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Red }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Orange }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Yellow }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Green }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Skyblue }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Blue }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Pupple }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Pink }}
            />
            <div
              className="colorPalette__color"
              style={{ backgroundColor: ColorPalette.Grey }}
            />

            <button
              className="DrawingPage__completeBtn"
              onClick={onClickComplete}
            >
              완성
            </button>
          </div>
        </div>
        <div className="right__canvas" ref={parentOfCanvasRef}>
          <canvas
            className="canvas__content"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onClick={paint}
          ></canvas>
        </div>
      </div>
    </div>
  );
}

export default DrawingPage;
