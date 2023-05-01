// Peach color btn for uploads and all

import React from "react";

export default function (props) {
  return (
    <button
      style={{
        margin: "10px",
        padding: "14px",
        width: "150px",
        paddingRight: "14px",
        paddingLeft: "14px",
        backgroundColor: "#F4B886",
        borderRadius: "22px",
        border: "none",
        color: "#FFFFFF",
      }}
      onClick={() => {
        props.action();
      }}
    >
      <span style={{fontSize: "21px"}}>{props.name}</span>
    </button>
  );
}
