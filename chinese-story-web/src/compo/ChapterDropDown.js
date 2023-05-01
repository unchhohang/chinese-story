// Chapters Drop down

import React, { useState } from "react";
import styles from "../css/chapterDropDown.module.css";
import PeachBtn from "./PeachBtn";

export default function ChapterDropDown() {
  const chapters = ["chapter 1", "chapter 2", "chapter 3", "chapter 4"];
  const [current, setCurrent] = useState(chapters[0]);

  const chaptersOptions = chapters.map((i) => {
    return (
      <option
        onClick={() => {
          console.log(i);
        }}
      >
        {i}
      </option>
    );
  });

  return (
    <div className={styles.chapterContainer}>
      <div>
        {/* <button className={styles.chaptersBtn}>{current}</button> */}
        {/* <button className={styles.chaptersBtn}>
          {current}
        </button>
        <div className={styles.chapters}>{chaptersOptions}</div> */}

        <select>
          {chaptersOptions}
        </select>
      </div>
    </div>
  );
}
