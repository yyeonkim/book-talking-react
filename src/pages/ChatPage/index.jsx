import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

import talkingProfile from "../../assets/talking_profile.png";
import { colorTheme } from "../../theme";
import "./style.css";

export default function ChatPage() {
  // 사용자 답변
  const [userAnswer, setUserAnswer] = useState("");
  // 채팅 리스트
  const [contentList, setContentList] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (userAnswer !== "") {
      // 채팅 리스트에 사용자 답변 추가
      setContentList((current) => [
        ...current,
        { role: "user", text: userAnswer },
      ]);
      setUserAnswer(""); // 초기화
    }
  };

  return (
    <>
      <div className="section--content">
        {contentList.map((item, index) =>
          item.role === "user" ? (
            <div key={`user${index}`} className="chat chat--user">
              <p className="text text--user">{item.text}</p>
            </div>
          ) : (
            <div key={`talking${index}`} className="chat chat--talking">
              <img className="profile--talking" src={talkingProfile} alt="" />
              <p className="text text--talking">
                안녕 영희! 요즘에 어떤 책을 읽었어?
              </p>
            </div>
          )
        )}
      </div>
      <form onSubmit={onSubmit} className="form--chat">
        <input
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
