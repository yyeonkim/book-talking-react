import { useLocation } from "react-router-dom";

import homeLogo from "../../../assets/home_logo.png";
import "./style.css";

export default function Header() {
  const location = useLocation();
  return (
    <header>
      {location.pathname === "/" ? (
        <span className="intro">토킹이 소개</span>
      ) : (
        <img className="home-logo" src={homeLogo} alt="홈 로고" />
      )}
    </header>
  );
}
