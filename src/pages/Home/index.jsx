import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import YellowButton from "../../components/YellowButton";
import homeLogo from "../../assets/logo_nobg_512.png";

export default function Home() {
  return (
    <>
      <div className="Home center">
        <img className="Home__image" src={homeLogo} alt="토킹이 로고" />
        <Link to={"chat"}>
          <YellowButton text="토킹이와 이야기 시작하기" />
        </Link>
      </div>
    </>
  );
}
