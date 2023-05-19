// Info for every story head

import React from "react";
import styles from "../css/storyHead.module.css";

export default function (props) {
  const story = props.story;
  const defaultImg =
    "https://i.pinimg.com/564x/59/ae/7b/59ae7bcae894619b9f4290df98402984.jpg";

  return (
    <div className={styles.container}>
      <img
        src={
          story.coverImageUrl !== undefined
            ? story.coverImageUrl.url
            : defaultImg
        }
        style={{ padding: "10px", margin: "10px" }}
        width={"25%"}
        height={"260vh"}
      ></img>
      <div className={styles.info}>
        <div>
          <h1 className={styles.storyTitle}>{story.title}</h1>
          <h3 className={styles.credit}>Author: {story.author}</h3>
        </div>
        <div className={styles.storyInfo}>
          <div style={{margin: "10px"}}>
            <span>
              {props.chapterCount} Cha <br /> Content
            </span>
          </div>
          <div style={{margin: "10px"}}>
            <span style={{ textAlign: "center" }}>
              &nbsp;&nbsp;&nbsp;{story.rating} <br /> Rating
            </span>
          </div>
          <div style={{margin: "10px"}}>
            <span>
              {story.status === "onGoing" ? "on Going" : "Complete"} <br /> Status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
