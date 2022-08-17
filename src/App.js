import React, { useState, useEffect } from "react";
import "./styles/style.css";
import Message from "./components/Message";
import data from "./data/message.json";

const App = () => {
  // 留言的狀態
  const [input, setInput] = useState("");

  // 留言陣列的狀態
  const [messageArr, setMessageArr] = useState([]);

  // 建立一個現在時間
  let d = new Date();
  // 格式化時間的函式
  function formatTime(d) {
    let year = d.getFullYear();
    let mouth =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    let minute = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    let second = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
    return `${year}-${mouth}-${date} ${hour}:${minute}:${second}`;
  }

  // 輸入內容時執行
  const inputHandler = (e) => {
    // 將輸入的內容存到狀態
    setInput(e.target.value);
  };

  // 按下送出時執行
  const submitHandler = (e) => {
    // 讓表單不要提交
    e.preventDefault();
    // 檢查是否有輸入內容
    if (input == "") {
      alert("請輸入內容");
    } else {
      let newArr = [
        { message: input, time: formatTime(d), reply: [] },
        ...messageArr,
      ];
      // 將留言新增到陣列中
      setMessageArr(newArr);
      // 將輸入框清空
      setInput("");
      // 將留言完後的整個陣列存到localstorage
      localStorage.setItem("message", JSON.stringify(newArr));
    }
  };
  
  // 一進到頁面取得localstorage的陣列
  useEffect(() => {
    getData();
  }, []);

  // 取得localstorage的陣列
  function getData() {
    let getDataArr = JSON.parse(localStorage.getItem("message"));
    if (getDataArr != null) {
      setMessageArr(getDataArr);
    }
  }

  return (
    <>
      <header className="wrapper">
        <h1>尋夢園</h1>
      </header>
      <form className="wrapper inputMessage">
        <textarea
          value={input}
          onChange={inputHandler}
          name=""
          id=""
          cols="15"
          rows="5"
          placeholder="留言..."
        ></textarea>
        <button onClick={submitHandler}>送出</button>
      </form>
      <main className="wrapper">
        {messageArr.map((v, i) => {
          return (
            <Message
              key={i}
              item={v}
              index={i}
              messageArr={messageArr}
              setMessageArr={setMessageArr}
            />
          );
        })}
      </main>
    </>
  );
};

export default App;
