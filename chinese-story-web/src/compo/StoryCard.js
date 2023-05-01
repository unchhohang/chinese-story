// Card view of Story

import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import style from "../css/storyCard.module.css";

export default function StoryCard() {
  const navigate = useNavigate();

  function openStory() {
    console.log("hello redirec");
    navigate("/story");
  }

  return (
    <div
      className={style.cardContainer}
      onClick={() => {
        openStory();
      }}
    >
      <img
        src="https://i.pinimg.com/564x/59/ae/7b/59ae7bcae894619b9f4290df98402984.jpg"
        height={"200vh"}
        width={"150vw"}
      />
      <h3 style={{ marginBottom: "0px" }}>Chinese tale</h3>
      <div style={{ paddingLeft: "20px" }}>
        <h5>
          <span style={{ marginRight: "1px" }}>#action </span>
          <span style={{ marginRight: "1px" }}>#action </span>
          <span style={{ marginRight: "1px" }}>#action </span>
          <span style={{ marginRight: "1px" }}>#action </span>
        </h5>
      </div>
    </div>
  );
}
