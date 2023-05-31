import { useEffect, useRef, useState } from "react";
import { RiPencilFill, RiPaintFill, RiCheckFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import html2canvas from "html2canvas";

import "./style.css";
import { imageCoordListState, isCopyState } from "../../recoil/drawing/atom";

/* 그리기 모드 */
const Action = {
  Pencil: "pencil",
  Paint: "paint",
};

const ColorPalette = {
  Black: "#000000",
  Red: "#e12828",
  Orange: "#ffa843",
  Yellow: "#ffe600",
  Green: "#2bc91d",
  Skyblue: "#2abdeb",
  Blue: "#3d4bc9",
  Pupple: "#a43fe1",
  Pink: "#ef78a3",
  White: "#ffffff",
};

const colorPaletteList = [
  ColorPalette.Black,
  ColorPalette.Red,
  ColorPalette.Orange,
  ColorPalette.Yellow,
  ColorPalette.Green,
  ColorPalette.Skyblue,
  ColorPalette.Blue,
  ColorPalette.Pupple,
  ColorPalette.Pink,
  ColorPalette.White,
];

function Canvas() {
  const {
    state: { story, title },
  } = useLocation();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const parentOfCanvasRef = useRef(null); // 캔버스 부모 요소
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [path, setPath] = useState(new Path2D()); // 사용자가 현재 그리는 path
  const [pathList, setPathList] = useState([]); // 사용자가 그린 path 배열
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // 캔버스 배경 색상
  const [selectedColor, setSelectedColor] = useState("#000000"); // 현재 선택한 색상
  const [action, setAction] = useState(Action.Pencil); // 그리기 액션 (pencil, paint)
  const [drawing, setDrawing] = useState(false); // 그리는 중이면 true 아니면 false

  const [isCopy, setIsCopy] = useRecoilState(isCopyState); // '가져오기'를 클릭하면 true가 되면서 그림을 가져올 수 있음
  const imageCoordList = useRecoilValue(imageCoordListState); // ai 그림의 좌표
  const [startPoint, setStartPoint] = useState(null); // ai 그림을 복사할 시작점

  useEffect(() => {
    const preventPageRefresh = (event) => {
      event.preventDefault();
    };

    canvas.addEventListener("touchmove", preventPageRefresh, {
      passive: false,
    });

    return () => {
      canvas.removeEventListener("touchmove", preventPageRefresh);
    };
  }, [canvas]);

  useEffect(() => {
    // '가져오기'를 누르고, 시작점을 지정했으면
    if (isCopy && startPoint) {
      // ai 그림을 사용자 캔버스로 가져오기
      copyDrawing();
      setIsCopy(false);
    }
  }, [startPoint]);

  const copyDrawing = () => {
    for (const [xList, yList] of imageCoordList) {
      const newPath = new Path2D();

      for (let i = 0; i < xList.length; i++) {
        newPath.lineTo(xList[i] + startPoint.x, yList[i] + startPoint.y); // 선 연결
        ctx.stroke(newPath); // 선 그리기
      }
      setPathList((current) => [...current, newPath]);
    }
  };

  useEffect(() => {
    initCanvas();
  }, [setCanvas]);

  const initCanvas = () => {
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
  };

  const onClickAction = (event) => {
    let target = event.target;
    let parent = target; // 아이콘을 모두 포함한 부모 요소
    let action = "";

    // 바로 부모 요소가 선택되면 동작 X
    if (target.tagName === "DIV") {
      return;
    } else if (target.tagName === "svg") {
      action = target.dataset.action;
      parent = target.parentElement;
      // svg 안에 있는 path가 선택되면
    } else if (target.tagName === "path") {
      action = target.parentElement.parentElement.dataset.action;
      parent = target.parentElement.parentElement.parentElement;
      target = target.parentElement.parentElement; // svg를 target으로 설정
    }
    setAction(action);

    // 이전 아이콘 id 제거
    removeChildId(parent, "tool__icon--selected");
    // 선택한 아이콘에 id 추가
    target.id = "tool__icon--selected";
  };

  const removeChildId = (parentElement, id) => {
    for (const child of parentElement.children) {
      if (child.id === id) {
        child.id = "";
      }
    }
  };

  const startDrawing = () => {
    if (action === Action.Pencil) {
      // 마우스를 누르면, 드로잉 시작
      setDrawing(true);
      // 새 path 객체 생성
      setPath(new Path2D());
    }
  };

  const stopDrawing = () => {
    if (action === Action.Pencil) {
      // 마우스를 떼면 드로잉 중단
      setDrawing(false);
      // 이제까지 그린 path 저장
      setPathList((current) => [...current, path]);
    }
  };

  /* 선 그리기 */
  const draw = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (drawing) {
      // 시작점과 현재 좌표 연결
      path.lineTo(offsetX, offsetY);
      // 선 그리기
      ctx.stroke(path);
    } else {
      // 시작점 옮기기
      path.moveTo(offsetX, offsetY);
    }
  };

  const onClickCanvas = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    // 사용자가 캔버스 그림을 가져오려고 하면
    if (isCopy) {
      // 시작점 저장하기
      setStartPoint({ x: offsetX, y: offsetY });
    } else {
      // 아니면 채우기
      paint(offsetX, offsetY);
    }
  };

  /* 채우기 */
  const paint = (x, y) => {
    if (action === Action.Paint) {
      let isBackground = true;

      // 클릭한 path 찾기
      for (const p of pathList) {
        const isPointInPath = ctx.isPointInPath(p, x, y);
        if (isPointInPath) {
          // 해당 path 내부 채우기
          ctx.fill(p, "evenodd");
          isBackground = false;
          break;
        }
      }
      // 해당하는 path가 없으면 캔버스 바탕 채우기
      if (isBackground) {
        setBackgroundColor(selectedColor);
      }
    }
  };

  const onClickPalette = (event) => {
    let target = event.target;

    // 체크 아이콘이 클릭되면 target을 부모 요소로 조정
    if (target.tagName === "svg") {
      target = target.parentElement;
    } else if (target.tagName === "path") {
      target = target.parentElement.parentElement;
    }

    const rgbColor = target.style.backgroundColor;
    const hexColor = rgbToHex(rgbColor);

    // 이전과 다른 색을 선택했을 때만 작동
    if (selectedColor !== hexColor) {
      ctx.strokeStyle = hexColor;
      ctx.fillStyle = hexColor;
      setSelectedColor(hexColor);
    }
  };

  const rgbToHex = (rgbString) => {
    let result = "#"; // 반환 결과
    // 숫자 배열로 변환
    let rgbInt = rgbString
      .slice(4, rgbString.length - 1)
      .split(",")
      .map((item) => Number(item.trim()));
    // 각 값을 16 진수 문자로 변환
    rgbInt.forEach((item) => {
      let str = item.toString(16);
      if (str.length === 1) {
        result += `0${str}`; // 한 자리 수는 앞에 0 붙이기
      } else {
        result += str;
      }
    });

    return result;
  };

  /* 캔버스 모두 지우기 */
  const clearCanvas = () => {
    // path 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // path 초기화
    ctx.beginPath();
    setPathList([]);
    setBackgroundColor("#fff");
  };

  const onClickComplete = () => {
    // 캔버스를 이미지로 전환
    html2canvas(parentOfCanvasRef.current).then((canvas) => {
      const drawingImage = canvas.toDataURL("image/png");
      // completePage에 이미지와 스토리 전달
      navigate("/complete", { state: { story, title, image: drawingImage } });
    });
  };

  return (
    <div className="Canvas">
      <div className="Canvas__tool">
        <div className="tool__action" onClick={onClickAction}>
          <RiPencilFill
            id="tool__icon--selected"
            className="tool__icon"
            data-action={Action.Pencil}
          />
          <RiPaintFill className="tool__icon" data-action={Action.Paint} />
        </div>
        <div className="tool_colorPalette">
          {colorPaletteList.map((item) => (
            <div
              key={item}
              className="colorPalette__color"
              style={{
                backgroundColor: item,
                border: item === "#ffffff" ? "1px solid black" : "none",
              }}
              onClick={onClickPalette}
            >
              {item === selectedColor && (
                <RiCheckFill color={item === "#ffffff" ? "black" : "white"} />
              )}
            </div>
          ))}
        </div>
        <div className="tool__buttons">
          <button className="tool__button" onClick={clearCanvas}>
            지우기
          </button>
          <button className="tool__button" onClick={onClickComplete}>
            완성
          </button>
        </div>
      </div>
      <div className="Canvas__canvas" ref={parentOfCanvasRef}>
        <canvas
          style={{ backgroundColor }}
          className="canvas__content"
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerUp={stopDrawing}
          onPointerMove={draw}
          onPointerLeave={stopDrawing}
          onClick={onClickCanvas}
        ></canvas>
      </div>
    </div>
  );
}

export default Canvas;
