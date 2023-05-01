// Create story pop up

import axios from "axios";
import React, { useState } from "react";
import BeaverBtn from "./BeaverBtn";

export default function (props) {
  const [title, setTitle] = useState("");

  function newStory() {
    axios
      .post("/story", { title: title })
      .then((res) => {
        console.log(res);
        props.setPopUp(!props.popUp);
        props.setRefresh(!props.refresh);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div
        style={{
          position: "fixed",
          backgroundColor: "#F4B886",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Title </h2>
          <input
            style={{ padding: "10px", width: "40vw", marginBottom: "20px" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <div>
            <BeaverBtn
              name={"OK"}
              action={() => {
                if (title !== "") {
                  newStory();
                }
              }}
            />
            <BeaverBtn
              name={"Cancel"}
              action={() => {
                props.setPopUp(!props.popUp);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
