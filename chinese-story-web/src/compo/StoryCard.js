// Card view of Story

import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import style from "../css/storyCard.module.css";

export default function StoryCard(props) {
  const navigate = useNavigate();
  const story = props.story;
  const darkImg =
    "https://i.pinimg.com/564x/59/ae/7b/59ae7bcae894619b9f4290df98402984.jpg";

  const renderTags = story.tags.map((tag, i) => {
    return (
      <>
        <span
          style={{
            marginRight: "1px",
            color: "#A18276",
          }}
        >
          {tag}
        </span>{" "}
      </>
    );
  });

  function openStory() {
    console.log("hello redirec");
    navigate("/story", { state: { story: props.story } });
  }

  return (
    <div
      className={style.cardContainer}
      onClick={() => {
        openStory();
      }}
    >
      <div>
        <span
          style={{
            background: "red",
            fontSize: "12px",
            position: "relative",
            left: "57px",
            color: "white",
            padding: "4px",
          }}
        >
          {story.status === "onGoing" ? "on Going" : "Complete"}
        </span>
        <img
          src={
            story.coverImageUrl === undefined
              ? darkImg
              : story.coverImageUrl.url
          }
          height={"200vh"}
          width={"150vw"}
        />
      </div>
      <h3 style={{ marginBottom: "0px" }}>{story.title}</h3>
      <div
        style={{
          margin: "5px",
          marginBottom: "0px",
        }}
      >
        <StarRatings
          rating={Number(story.rating)}
          starRatedColor="#F4B886"
          starEmptyColor="#f5f3f4"
          starDimension="20px"
          starSpacing="2px"
        />
      </div>
      <div
        style={{
          paddingLeft: "20px",
        }}
      >
        <h6
          style={{
            marginTop: "12px",
          }}
        >
          {renderTags}
        </h6>
      </div>
    </div>
  );
}
