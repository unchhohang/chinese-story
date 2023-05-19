// Story page

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Header from "../compo/Header";
import OnlyLogoHeader from "../compo/OnlyLogoHeader";
import StoryHead from "../compo/StoryHead";
import styles from "../css/storyPage.module.css";

export default function StoryPage() {
  const location = useLocation();
  const story = location.state.story;
  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);

  const RenderChapters = chapters.map((chapter, i) => {
    return (
      <div
        key={i}
        className={styles.tableContent}
        onClick={() => {
          navigate(`/story/reading/${story._id}/${chapter._id}`, {
            state: chapters,
          });
        }}
      >
        {chapter.chapterTitle}
      </div>
    );
  });

  useEffect(() => {
    axios
      .get("/story/chapters", { params: { storyId: story._id } })
      .then((res) => {
        console.log(`chapters in useEffect`);
        console.log(res.data);
        setChapters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <OnlyLogoHeader />
      <StoryHead story={story} chapterCount={chapters.length} />

      {/* about and table of content */}
      <div>
        <h1>About</h1>
        <div
          style={{
            padding: "10px",
            margin: "5px",
          }}
        >
          {story.synopsis ? story.synopsis : ""}
        </div>
        <h1>Table of Content</h1>
        <div
          style={{
            display: "grid",
            columnGap: "50px",
            gridTemplateColumns: "auto auto",
            margin: "10px",
          }}
        >
          {chapters.length === 0 ? (
            <ClipLoader />
          ) : (
            <div>{RenderChapters} </div>
          )}
        </div>
      </div>
    </div>
  );
}
