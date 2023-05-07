// table of content managlment panel
// Component used to manage story content

import React, { useEffect, useState } from "react";
import DeleteWarn from "./DeleteWarn";
import PeachBtn from "./PeachBtn";
import styles from "../css/tableContentM.module.css";
import ChapterRow from "./ChapterRow";
import axios from "axios";
import { GridLoader } from "react-spinners";

export default function TableContentM(props) {
  const [chapterD, setChapterD] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [titleV, setTitleV] = useState("");
  const [chapters, setChapters] = useState([]);

  // loader
  const [loader, setLoader] = useState(false);

  const story = props.story;

  useEffect(() => {
    fetchChapters();
  }, [story, loader]);

  // fetch chapter by storyId
  // Also set respective state
  function fetchChapters() {
    axios
      .get("/chapter/stories", {
        params: { storyId: story._id },
      })
      .then((res) => {
        let chapterList = res.data;

        if (chapterList.length === 0) {
          return;
        }

        setChapters(
          chapterList.map((x) => {
            return (
              <ChapterRow
                chapterId={x._id}
                title={x.chapterTitle}
                chapterD={chapterD}
                setChapterD={setChapterD}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
              />
            );
          })
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{
        border: "0.3px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      {loader ? (
        <GridLoader />
      ) : (
        <div>
          {chapterD && (
            <DeleteWarn 
              chapterD={chapterD}
              setChapterD={setChapterD}
              deleteId={deleteId}
              setDeleteId={setDeleteId} 
              loader={loader}
              setLoader={setLoader}
            />
          )}
          <div
            style={
              chapterD ? { pointerEvents: "none" } : { pointerEvents: "auto" }
            }
          >
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Table of content
            </h2>
            <div>{chapters}</div>

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
                  if (titleV === "") return;

                  setLoader(true);
                  // upload chapter title
                  axios
                    .post("/chapter", {
                      storyId: story._id,
                      chapterTitle: titleV,
                    })
                    .then((res) => {
                      console.log(res.data);
                      setLoader(false);
                    })
                    .catch((err) => console.log(err));
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
