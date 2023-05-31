import { useEffect } from "react";

import "./style.css";
import Canvas from "../../components/Canvas";
import AiCanvas from "../../components/AiCanvas";

function DrawingPage() {
  useEffect(() => {
    const preventPageRefresh = (event) => {
      event.preventDefault();
    };

    document.addEventListener("touchmove", preventPageRefresh, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventPageRefresh);
    };
  }, []);

  return (
    <div className="DrawingPage">
      <AiCanvas />
      <Canvas />
    </div>
  );
}

export default DrawingPage;
