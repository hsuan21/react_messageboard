import React, { useState, useEffect } from "react";
import Reply from "./Reply";

function Message({ item, messageArr, setMessageArr, index }) {
  // 回覆的狀態
  const [reply, setReply] = useState("");

  // 輸入回覆時執行
  const inputHandler = (e) => {
    // 將輸入的回覆存到狀態
    setReply(e.target.value);
  };

  // 按下送出時執行
  const submitHandler = (e) => {
    // 讓表單不要提交
    e.preventDefault();

    // 檢查是否有輸入內容
    if (reply == "") {
      alert("請輸入內容");
    } else {
      // 將目前留言的陣列存到一個新陣列中
      let newArr = [...messageArr]
      // 將回覆新增至留言裡的陣列中
      newArr[index].reply = [...newArr[index].reply, reply];
      // 更新留言的陣列
      setMessageArr(newArr);
      // 將輸入框清空
      setReply("");
      // 將回覆完後的整個陣列存到localstorage
      localStorage.setItem("message", JSON.stringify(newArr));
    }
  };

  return (
    // 一整個留言區塊
    <div className="item">
      {/* 留言區 */}
      <div className="message">
        <img src={require("../images/user.jpg")} alt="" />
        <div className="msgText">
          <p>機器人{index}號</p>
          <p>{item.time}</p>
          <h3>{item.message}</h3>
        </div>
      </div>
      {/* 回覆區 */}
      <div className="reply">
        {
          // 留言底下的回覆
          messageArr[index].reply.map((v, i) => {
            return <Reply key={i} value={v} index={i} />;
          })
        }
        <form>
          <input
            type="text"
            value={reply}
            onChange={inputHandler}
            placeholder="回覆這則留言..."
          />
          <button onClick={submitHandler}>送出</button>
        </form>
      </div>
    </div>
  );
}

export default Message;
