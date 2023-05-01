// table of content managlment panel
// Component used to manage story content

import React, { useState } from "react";
import DeleteWarn from "./DeleteWarn";
import PeachBtn from "./PeachBtn";
import styles from "../css/tableContentM.module.css";
import ChapterRow from "./ChapterRow";

export default function TableContentM() {
  const [chapterD, setChapterD] = useState(false);
  const [titleV, setTitleV] = useState("");
  const [chapters, setChapters] = useState([
    { chapterTitle: "Chapter 1: Sins of Alchemy" },
    { chapterTitle: "Chapter 2: Pure by blood" },
    { chapterTitle: "chapter 3: Half Pure" },
  ]);

  const chaptersRender = chapters.map((x) => {
    return (
      <ChapterRow
        title={x.chapterTitle}
        chapterD={chapterD}
        setChapterD={setChapterD}
      />
    );
  });

  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "center",
        border: "0.3px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      {chapterD && <DeleteWarn />}
      <div
        style={chapterD ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
      >
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Table of content
        </h2>
        <div>{chaptersRender}</div>

        {/* New chapter input */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "10px",
            padding: "10px",
          }}
        >
          <input
            value={titleV}
            onChange={(e) => {
              setTitleV(e.target.value);
            }}
            className={styles.chapterInput}
          ></input>
          <PeachBtn
            name={"Add"}
            action={() => {
              console.log("Add");
            }}
          />
        </div>
      </div>
    </div>
  );
}
