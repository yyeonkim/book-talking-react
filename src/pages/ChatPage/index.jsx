import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

import talkingProfile from "../../assets/talking_profile.png";
import { colorTheme } from "../../theme";
import { sendMessage, startChat } from "../../api/chatAPI";
import "./style.css";

export default function ChatPage() {
  // 사용자 답변
  const [userAnswer, setUserAnswer] = useState("");
  // 채팅 리스트
  const [chatList, setChatList] = useState([]);
  const [disabled, setDisable] = useState(true); // 사용자 채팅 disable
  const scrollRef = useRef(null);

  useEffect(() => {
    // 채팅 시작말 가져오기
    if (chatList.length === 0) {
      startChat().then((res) => {
        setChatList([res.data]);
        setDisable(false);
      });
    }
  }, []);

  useEffect(() => {
    // 사용자가 채팅을 입력하면 토킹 답변 가져오기
    if (chatList.length > 1 && disabled) {
      sendMessage(chatList).then((res) => {
        // 토킹 답변 state에 저장
        setChatList((current) => [...current, res.data]);
        setDisable(false);
      });
    }
  }, [chatList, disabled]);

  useEffect(() => {
    // 채팅이 늘어나면 맨 아래로 스크롤 하기
    scrollToBottom();
  }, [chatList]);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (userAnswer !== "") {
      const newChat = { role: "user", content: userAnswer };
      // 사용자 채팅 state에 저장
      setChatList((current) => [...current, newChat]);
      setUserAnswer(""); // 사용자 입력 초기화
      setDisable(true); // 토킹이 답변할 때까지 입력 막기
    }
  };

  return (
    <>
      <div ref={scrollRef} className="section--content">
        {chatList.map((item, index) =>
          item.role === "user" ? (
            <div key={`user${index}`} className="chat chat--user">
              <p className="text text--user">{item.content}</p>
            </div>
          ) : (
            <div key={`talking${index}`} className="chat chat--talking">
              <img className="profile--talking" src={talkingProfile} alt="" />
              <p className="text text--talking">{item.content}</p>
            </div>
          )
        )}
      </div>
      <form onSubmit={onSubmit} className="form--chat">
        <input
          disabled={disabled}
          value={userAnswer}
          onChange={(event) => setUserAnswer(event.target.value)}
          className="input--chat"
          type="text"
        />
        <button className="send-button">
          <IoSend size={24} color={colorTheme.grey} />
        </button>
      </form>
    </>
  );
}
