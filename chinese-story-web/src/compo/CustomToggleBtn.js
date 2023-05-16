// self made custom togle btn

import React, { useState } from "react";
import styles from "../css/customToggleBtn.module.css";

export default function CustomToggleBtn(props) {
  return (
    <label class={styles.switch}>
      <input type="checkbox" checked={props.checked} 
        onClick={()=>{
          props.onClicked();
        }}
      />

      <span class={styles.slider + " " + styles.round}></span>
    </label>
  );
}
