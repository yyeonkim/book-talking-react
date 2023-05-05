import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import YellowButton from "../../components/YellowButton";
import "./style.css";

export default function StoryPage() {
  const { state: story } = useLocation();
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");

  // 제목이 입력되면 버튼 활성화
  useEffect(() => {
    if (title === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [title]);

  return (
    <div className="main center">
      <div className="title">
        <img className="title__img" src="logo_no_text.png" alt="토킹 로고" />
        <div className="title__text">
          <p className="title__p">이야기를 완성했어!</p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="title__input"
            type="text"
            placeholder="이야기에 어울리는 제목을 지어줄래?"
          />
        </div>
      </div>
      <p className="story">{story}</p>
      <Link to={"/"}>
        <YellowButton disabled={disabled} text="이제 그림을 그려보자" />
      </Link>
    </div>
  );
}
