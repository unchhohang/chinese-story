// Item for group selection in stories managment

import React from "react";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const navigate = useNavigate();

  function onStoriesCardClicked() {
    // Last url section need to be set dynamic
    navigate("/managment/stories/dynamic");
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "10px",
        marginBottom: "15px",
        backgroundColor: "#F4B886",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        onStoriesCardClicked();
      }}
    >
      <div>
        <img src={props.coverImageUrl} height={"200vh"} width={"150vw"}></img>
      </div>
      <div>
        <div>
          <h2>&nbsp; {props.title}</h2>
          <h5>&nbsp;&nbsp;&nbsp; By: {props.author}</h5>
        </div>
      </div>
    </div>
  );
}
