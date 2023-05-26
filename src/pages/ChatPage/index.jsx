import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import "./style.css";
import talkingProfile from "../../assets/talking_profile.png";
import { colorTheme } from "../../theme";
import { sendMessage, startChat } from "../../api/chatAPI";

export default function ChatPage() {
  // 사용자 답변
  const [userAnswer, setUserAnswer] = useState("");
  const [chatList, setChatList] = useState([]);
  const [disabled, setDisable] = useState(true); // 사용자 채팅 disable
  const scrollRef = useRef(null);
  const naviagte = useNavigate();

  useEffect(() => {
    // 채팅 시작
    // gpt 시스템 메시지
    const systemMessage = {
      role: "system",
      content:
        "You are a Korean elementary student. Your task is to talk about a story with elementary students. Your main objective is to generate story questions of the story an user read to help the user to cultivate imagination. If the user answers your question, you also answer simply and then generate next question. Generate one question at a time and say in Korean, not English. For your first assignment, you are tasked with saying hello to 연이, asking her what book she read recently.",
    };
    startChat(systemMessage).then((res) => {
      setChatList([systemMessage, res.data]);
      setDisable(false);
    });
  }, []);

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

      setDisable(true);
      setUserAnswer(""); // 사용자 입력 초기화
      setChatList((current) => [...current, newChat]);
      sendMessage([...chatList, newChat]).then((res) => {
        // 사용자와 토킹 답변 state에 저장
        setChatList((current) => [...current, res.data]);
        setDisable(false);

        // 8번 질문 받으면 로딩 화면으로 이동
        if (chatList.length >= 16) {
          naviagte("/loading", { state: [...chatList, res.data] });
        }
      });
    }
  };

  return (
    <>
      <div ref={scrollRef} className="ChatPage">
        {chatList.slice(1).map((item, index) =>
          item.role === "user" ? (
            <div
              key={`user${index}`}
              className="ChatPage__chat ChatPage__chat--user"
            >
              <p className="chat__text chat__text--user">{item.content}</p>
            </div>
          ) : (
            <div
              key={`talking${index}`}
              className="ChatPage-chat ChatPage__chat--talking"
            >
              <img className="chat__profile" src={talkingProfile} alt="" />
              <p className="chat__text chat__text--talking">{item.content}</p>
            </div>
          )
        )}
      </div>
      <form onSubmit={onSubmit} className="ChatPage__form">
        <input
          disabled={disabled}
          value={userAnswer}
          onChange={(event) => setUserAnswer(event.target.value)}
          className="ChatPage__input"
          type="text"
        />
        <button className="ChatPage__sendButton">
          <IoSend size={24} color={colorTheme.grey} />
        </button>
      </form>
    </>
  );
}
