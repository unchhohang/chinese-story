// Chapters Drop down

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/chapterDropDown.module.css";
import PeachBtn from "./PeachBtn";

export default function ChapterDropDown(props) {
  const chapters = props.chapters;
  const [DVisible, setDVisible] = useState(false);
  const navigate = useNavigate();

  const chaptersOptions = chapters.map((c, i) => {
    console.log(`nav lins in render chapter`);
    console.log(`/story/reading/${props.storyId}/${c._id}`);
    return (
      <li
        onClick={() => {
          setDVisible(!DVisible)
          navigate(`/story/reading/${props.storyId}/${c._id}`, {
            state: chapters,
          });
        }}
      >
        Chapter {i + 1}
      </li>
    );
  });

  return (
    <div className={styles.chapterContainer}>
      <div style={{}}>
        <button
          style={{
            width: "10rem",
            padding: "10px",
            backgroundColor: "#F4B886",
            border: "none",
          }}
          onClick={() => {
            setDVisible(!DVisible);
          }}
        >
          {props.currentTitle}
        </button>
        {DVisible ? (
          <div
            style={{
              position: "absolute",
              overflowY: "auto",
              height: "300px",
              width: "10rem",
            }}
          >
            {chaptersOptions}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
