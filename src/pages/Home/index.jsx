import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import "./style.css";
import YellowButton from "../../components/YellowButton";
import homeLogo from "../../assets/logo_nobg_512.png";
import { usernameState } from "../../recoil/drawing/atom";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameState);
  const [disabled, setDisable] = useState(true);

  /* 사용자 이름을 입력하면 버튼 활성화 */
  useEffect(() => {
    if (username.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [username.length === 0]);

  const onChange = (event) => {
    setUsername(event.target.value);
  };

  const onClick = (event) => {
    // 채팅 화면으로 넘어가기
    navigate("/chat");
  };

  return (
    <>
      <div className="Home center">
        <img className="Home__image" src={homeLogo} alt="토킹이 로고" />
        <input
          value={username}
          onChange={onChange}
          className="Home__username"
          type="text"
          placeholder="친구의 이름을 알려주세요"
        />
        <YellowButton
          text="토킹이와 이야기 시작하기"
          disabled={disabled}
          onClick={onClick}
        />
      </div>
    </>
  );
}
