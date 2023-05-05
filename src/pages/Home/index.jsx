import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function Home() {
  return (
    <>
      <div className="main center">
        <img className="img--home" src="logo_nobg_512.png" alt="토킹이 로고" />
        <Link to={"chat"}>
          <button className="main-button">토킹이와 이야기 시작하기</button>
        </Link>
      </div>
    </>
  );
}
