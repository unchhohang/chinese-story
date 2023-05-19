// Reading story

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ArrowBackOutline,
  ArrowForwardOutline,
  BookOutline,
} from "react-ionicons";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ChapterDropDown from "../compo/ChapterDropDown";
import Header from "../compo/Header";
import OnlyLogoHeader from "../compo/OnlyLogoHeader";
import styles from "../css/reading.module.css";

export default function Reading() {
  const [content, setContent] = useState([]);
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const chapters = location.state;

  const chapter = data.chapter.data;
  const backChapterId = data.frontBackChapter.data?.backChapter?._id;
  const frontChapterId = data.frontBackChapter.data?.frontChapter?._id;

  useEffect(() => {
    if (chapter.chapterContent === undefined) return;
    let data = chapter.chapterContent;
    let splited = data.split("\n");
    let purified = splited.filter((i) => i !== "");
    setContent(purified);
  }, [data]);

  const renderContent = content.map((i) => {
    return <p>{i}</p>;
  });

  return (
    <div>
      <OnlyLogoHeader />
      <h1 style={{ textAlign: "center" }}>{chapter.chapterTitle}</h1>

      {/* Chapter dropdown */}
      <div>
        <ChapterDropDown
          storyId={chapter.storyId}
          chapters={chapters}
          currentTitle={chapter.chapterTitle}
        />{" "}
      </div>

      <div>{renderContent}</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <span className={styles.hrCustom}></span>
        <BookOutline color={"#00000"} height="50px" width="50px" />
        <span className={styles.hrCustom}></span>
      </div>

      {/* next btn */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {backChapterId ? (
          <button
            style={{ padding: "5px", margin: "10px" }}
            onClick={() => {
              navigate(`/story/reading/${chapter.storyId}/${backChapterId}`, {
                state: chapters,
              });
            }}
          >
            <ArrowBackOutline color={"#00000"} height="25px" width="25px" />
          </button>
        ) : (
          ""
        )}
        {frontChapterId ? (
          <button style={{ padding: "5px", margin: "10px" }}>
            <ArrowForwardOutline
              color={"#00000"}
              height="25px"
              width="25px"
              onClick={() => {
                navigate(
                  `/story/reading/${chapter.storyId}/${frontChapterId}`,
                  { state: chapters }
                );
              }}
            />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
