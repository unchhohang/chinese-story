// Button component for reuse. It's a bever color

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
        backgroundColor: "#A18276",
        borderRadius: "22px",
        border: "none",
        color: "#FFFFFF",
      }}
      onClick={()=>{props.action()}}
    >{props.name}</button>
  );
}
