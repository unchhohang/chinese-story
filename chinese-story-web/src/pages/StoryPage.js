// Story page

import React from "react";
import Header from "../compo/Header";
import StoryHead from "../compo/StoryHead";
import styles from "../css/storyPage.module.css";

export default function StoryPage() {
  return (
    <div>
      <Header />
      <StoryHead />

      {/* about and table of content */}
      <div>
        <h1>About</h1>
        <div
          style={{
            padding: "10px",
            margin: "5px",
          }}
        >
          dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It
          was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem I
        </div>
        <h1>Table of Content</h1>
        <div
          style={{
            display: "grid",
            columnGap: "50px",
            gridTemplateColumns: "auto auto",
            margin: "10px"
          }}
        >
          <div className={styles.tableContent}>Chapter 1 : Sins of Legend</div>
          <div className={styles.tableContent}>Chapter 2 : Curse and Curse</div>
          <div className={styles.tableContent}>Chapter 1 : Sins of Legend</div>
          <div className={styles.tableContent}>Chapter 2 : Curse and Curse</div>
          <div className={styles.tableContent}>Chapter 1 : Sins of Legend</div>
          <div className={styles.tableContent}>Chapter 2 : Curse and Curse</div>
        </div>
      </div>
    </div>
  );
}
