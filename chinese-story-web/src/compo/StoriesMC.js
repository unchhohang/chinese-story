// Item for group selection in stories managment

import React from "react";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    
    function onStoriesCardClicked(){
      // Last url section need to be set dynamic
      navigate('/managment/stories/dynamic');

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
        <img
          src="https://i.pinimg.com/474x/ca/a2/45/caa24565616e2750eadf57653e919c24.jpg"
          height={"200vh"}
          width={"150vw"}
        ></img>
      </div>
      <div>
        <div>
          <h2>&nbsp; A Chinese tale like none</h2>
          <h5>&nbsp;&nbsp;&nbsp; By: Me</h5>
        </div>
      </div>
    </div>
  );
}
