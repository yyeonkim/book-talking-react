import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./style.css";
import YellowButton from "../../components/YellowButton";

export default function StoryPage() {
  const { state: story } = useLocation();
  const navigate = useNavigate();
  const storyRef = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");

  const onClick = () => {
    // 완성된 동화를 다음 화면에 전달
    const editedStory = storyRef.current.textContent;
    navigate("/drawing", { state: { title, story: editedStory } });
  };

  // 제목이 입력되면 버튼 활성화
  useEffect(() => {
    if (title.length === 0) setDisabled(true);
    else setDisabled(false);
  }, [title.length]);

  return (
    <div className="StoryPage center">
      <div className="StoryPage__title">
        <img className="title__img" src="logo_no_text.png" alt="토킹 로고" />
        <div className="title__text">
          <p className="title__p">이야기를 완성했어요!</p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="title__input"
            type="text"
            placeholder="이야기에 어울리는 제목을 지어주세요"
          />
        </div>
      </div>
      <p
        className="StoryPage__story"
        ref={storyRef}
        contentEditable
        suppressContentEditableWarning
      >
        {story}
      </p>
      <YellowButton
        onClick={onClick}
        disabled={disabled}
        text="이제 그림을 그려보자"
      />
    </div>
  );
}
