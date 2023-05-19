import { Link, useLocation } from "react-router-dom";

import "./style.css";
import homeLogo from "../../../assets/home_logo.png";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      {location.pathname === "/" ? (
        <span className="Header__intro">토킹이 소개</span>
      ) : (
        <Link to={"/"}>
          <img className="Header__logo" src={homeLogo} alt="홈 로고" />
        </Link>
      )}
    </header>
  );
}
