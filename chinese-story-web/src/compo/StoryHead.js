// Info for every story head

import React from "react";
import styles from "../css/storyHead.module.css";

export default function () {
  return (
    <div className={styles.container}>
      <img
        src="https://i.pinimg.com/736x/47/3a/2f/473a2ff94dab78556cea8ecb0f743f99.jpg"
        style={{ padding: "10px", margin: "10px" }}
        width={"25%"}
        height={"260vh"}
      ></img>
      <div className={styles.info}>
        <div>
          <h1 className={styles.storyTitle}>A Chinese Tale Like none</h1>
          <h3 className={styles.credit}>Author: Lengendary</h3>
        </div>
        <div className={styles.storyInfo}>
          <div>
            <span>
              277 Cha <br /> Content
            </span>
          </div>
          <div>
            <span style={{textAlign: "center"}}>
              &nbsp;&nbsp;&nbsp;4.8 <br /> Rating
            </span>
          </div>
          <div>
            <span>
              Ongoing <br /> Status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
