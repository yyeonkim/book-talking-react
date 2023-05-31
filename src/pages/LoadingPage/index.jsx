import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./style.css";
import Loader from "../../components/Loader";
import { summarizeChat } from "../../api/chatAPI";
import logoImage from "../../assets/logo_no_text.png";

export default function LoadingPage() {
  const { state: chatList } = useLocation();
  const navigate = useNavigate();

  // 채팅 요약하기
  useEffect(() => {
    summarizeChat(chatList).then((res) => {
      // 완성된 동화를 다음 화면에 전달
      navigate("/create-story", { state: res.data.content });
    });
  }, []);

  return (
    <div className="LoadingPage center">
      <img className="LoadingPage__image" src={logoImage} alt="토킹이 로고" />
      <p className="LoadingPage__title">
        즐거운 대화였어요!
        <br />
        이야기를 만들고 있으니 잠시만 기다려주세요.
      </p>
      <Loader />
    </div>
  );
}
