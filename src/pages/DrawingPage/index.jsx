import "./style.css";
import Canvas from "../../components/Canvas";
import AiCanvas from "../../components/AiCanvas";

function DrawingPage() {
  return (
    <div className="DrawingPage">
      <AiCanvas />
      <Canvas />
    </div>
  );
}

export default DrawingPage;
