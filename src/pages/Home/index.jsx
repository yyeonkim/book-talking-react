import React from "react";

import "./style.css";

export default function Home() {
  function onClickIntro() {
    // 토킹이 소개 화면 보이기
  }

  return (
    <div>
      <header>
        <span onClick={onClickIntro}>토킹이 소개</span>
      </header>
      <main>
        <img src="logo_nobg_512.png" alt="토킹이 로고" />
        <button>토킹이와 이야기 시작하기</button>
      </main>
    </div>
  );
}
