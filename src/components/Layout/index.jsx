import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";
import Header from "./Header";
import { colorTheme } from "../../theme";

export default function Layout() {
  const location = useLocation();
  const [bgColor, setBgColor] = useState(colorTheme.backgroundColor);

  useEffect(() => {
    if (location.pathname === "/chat") {
      setBgColor("#fff");
    }

    if (location.pathname === "/") {
      setBgColor(colorTheme.backgroundColor);
    }
  }, [location]);

  return (
    <div id="background" style={{ backgroundColor: bgColor }}>
      <Header />
      <Outlet />
    </div>
  );
}
