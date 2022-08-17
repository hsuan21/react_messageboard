import React from "react";

function Reply({ value, index }) {
  return (
    <div className="replyText">
      <span>小倩{index}號</span>
      <span>：</span>
      <span>{value}</span>
    </div>
  );
}

export default Reply;
