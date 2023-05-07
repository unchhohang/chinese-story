// Story delete pop up component

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PeachBtn from "./PeachBtn";

export default function StoryDeletePop(props) {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "red",
        width: "60vw",
        height: "50vh",

        left: "25%",
        top: "30%",

        border: "1px solid #011627",
        boxShadow: "-2px 5px 5px #E71D36",

        margin: "10px",
        padding: "20px",
      }}
    >
      <h4>Delete Story</h4>
      <div>
        <input
          type="string"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <PeachBtn
          name={"Delete"}
          action={(e) => {
            if (value !== "abrakadabra") return;

            axios
              .delete("/story", {
                params: {storyId : props.storyId}
              })
              .then((res) => {
                navigate("/managment/stories");
              })
              .catch((err) => console.log(err));
          }}
        ></PeachBtn>

        <PeachBtn
          name={"Cancel"}
          action={() => {
            props.setStoryDPop(false);
          }}
        ></PeachBtn>
      </div>
    </div>
  );
}
