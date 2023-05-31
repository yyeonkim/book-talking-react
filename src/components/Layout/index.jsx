import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";
import Header from "./Header";
import { colorTheme } from "../../theme";

export default function Layout() {
  const location = useLocation();
  const [bgColor, setBgColor] = useState(colorTheme.backgroundColor);

  useEffect(() => {
    if (location.pathname === "/chat" || location.pathname === "/drawing") {
      setBgColor("#fff");
    } else {
      setBgColor(colorTheme.backgroundColor);
    }
  }, [location]);

  return (
    <>
      <div className="Layout__message Layout__message--screen">
        <p>
          토킹이가 나오기에 화면이 너무 작아요🥺 <br />
          패드나 데스크탑으로 접속해주세요
        </p>
      </div>
      <div className="Layout__message Layout__message--orientation">
        <p>
          토킹이는 가로 모드에서만 등장합니다🙂 <br />
          패드나 데스크탑으로 접속해주세요
        </p>
      </div>
      <div id="Layout" style={{ backgroundColor: bgColor }}>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
