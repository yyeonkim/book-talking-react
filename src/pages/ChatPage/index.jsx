import React from "react";
import { IoSend } from "react-icons/io5";

import talkingProfile from "../../assets/talking_profile.png";
import { colorTheme } from "../../theme";
import "./style.css";

export default function ChatPage() {
  return (
    <>
      <div className="section--content">
        <div className="chat chat--talking">
          <img className="profile--talking" src={talkingProfile} alt="" />
          <p className="text text--talking">
            안녕 영희! 요즘에 어떤 책을 읽었어?
          </p>
        </div>
        <div className="chat chat--user">
          <p className="text text--user">이상한 나라의 앨리스를 읽었어</p>
        </div>
      </div>
      <form className="form--chat">
        <input className="input--chat" type="text" />
        <button className="send-button">
          <IoSend size={24} color={colorTheme.grey} />
        </button>
      </form>
    </>
  );
}
