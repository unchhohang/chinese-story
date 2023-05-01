// Reading story

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ArrowBackOutline,
  ArrowForwardOutline,
  BookOutline,
} from "react-ionicons";
import ChapterDropDown from "../compo/ChapterDropDown";
import Header from "../compo/Header";
import styles from "../css/reading.module.css";

export default function Reading() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/chapter", {
        params: {
          chapterId: "644a242eb51130b91453ef38",
        },
      })
      .then((res) => {
        // purify the content LOL
        let data = res.data.chapterContent;
        let splited = data.split("\n");
        let purified = splited.filter((i) => i !== "");
        setContent(purified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderContent = content.map((i) => {
    return <p>{i}</p>;
  });

  return (
    <div>
      <Header />
      <h1>Chapter 1: Sins of Legend</h1>

      {/* Chapter dropdown */}
      <div>
        <ChapterDropDown />
      </div>

      <div>{renderContent}</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <span className={styles.hrCustom}></span>
        <BookOutline color={"#00000"} height="50px" width="50px" />
        <span className={styles.hrCustom}></span>
      </div>

      {/* next btn */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={{ padding: "5px", margin: "10px" }}>
          <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
        </button>
        <button style={{ padding: "5px", margin: "10px" }}>
          <ArrowForwardOutline color={"#00000"} height="25px" width="25px" />
        </button>
      </div>
    </div>
  );
}
