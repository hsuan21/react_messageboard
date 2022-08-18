import React from "react";

function Reply({ reply, replyIndex, messageArr, setMessageArr, messageIndex }) {
  const deleteHandler = () => {
    // 將目前留言的陣列存到一個新陣列中，等等要改變留言裡回覆的陣列
    let newArr = [...messageArr];
    // 篩選不是這個index的回覆，存到一個新陣列中
    let filterArr = newArr[messageIndex].reply.filter(
      (v, i) => replyIndex != i
    );
    // 將留言裡回覆的陣列改成篩選過後的新陣列
    newArr[messageIndex].reply = filterArr;
    // 更新留言的陣列
    setMessageArr(newArr);
    // 將刪除回覆完後的整個陣列存到localstorage
    localStorage.setItem("message", JSON.stringify(newArr));
  };

  return (
    <div className="replyText">
      <div>
        <span>小倩{replyIndex}號</span>
        <span>：</span>
        <span>{reply}</span>
      </div>
      <div onClick={deleteHandler} className="deleteBtn">
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
}

export default Reply;
