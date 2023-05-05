import { useEffect } from "react";
import Loader from "../../components/Loader";
import "./style.css";
import { summarizeChat } from "../../api/chatAPI";
import { redirect } from "react-router-dom";

export default function LoadingPage({ chatList }) {
  // 채팅 요약하기
  useEffect(() => {
    summarizeChat(chatList).then((res) => {
      redirect("/create-story");
    });
  }, []);
  return (
    <>
      <div className="main center">
        <img
          className="img--loading"
          src="logo_no_text.png"
          alt="토킹이 로고"
        />
        <p className="p--loading">
          즐거운 대화였어!
          <br />
          이야기를 만들고 있으니 잠시만 기다려줘.
        </p>
        <Loader />
      </div>
    </>
  );
}
