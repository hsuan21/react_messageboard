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
      // 將目前留言的陣列存到一個新陣列中，不能用let newArr = messageArr，這樣會參照到同一個記憶體位址，改到state
      let newArr = [...messageArr];
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

  // 按下刪除時執行
  const deleteHandler = (e) => {
    // 篩選不是這個index的留言，存到一個新陣列中
    let newArr = messageArr.filter((v, i) => index != i);
    // 更新留言的陣列
    setMessageArr(newArr);
    // 將刪除留言後的整個陣列存到localstorage
    localStorage.setItem("message", JSON.stringify(newArr));
  };

  return (
    // 一整個留言區塊
    <div className="item">
      {/* 留言區 */}
      <div className="message">
        <div className="d-flex">
          <img src={require("../images/user.jpg")} alt="" />
          <div className="msgText">
            <p>機器人{index}號</p>
            <p>{item.time}</p>
            <h3>{item.message}</h3>
          </div>
        </div>

        <div className="deleteBtn">
          <button onClick={deleteHandler}>刪除</button>
        </div>
      </div>
      {/* 回覆區 */}
      <div className="reply">
        {
          // 留言底下的回覆
          messageArr[index].reply.map((v, i) => {
            return (
              <Reply
                key={i}
                reply={v}
                replyIndex={i}
                messageArr={messageArr}
                setMessageArr={setMessageArr}
                messageIndex={index}
              />
            );
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
