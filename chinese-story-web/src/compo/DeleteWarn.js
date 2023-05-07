// Pop up component for delete warning
// Password is abrakadabra

import axios from "axios";
import React, { useState } from "react";
import PeachBtn from "./PeachBtn";

export default function (props) {
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "red",
        width: "60vw",
        height: "50vh",

        left: "25%",
        top: "30%",

        border: "1px solid #011627",
        boxShadow: "-2px 5px 5px #E71D36",

        margin: "10px",
        padding: "20px",
      }}
    >
      <h3>Warning</h3>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <PeachBtn
          name={"Delete"}
          action={() => {
            props.setLoader(!props.loader);

            // making it difficult to delete
            if (value !== "abrakadabra") {
              props.setLoader(false);
              return;
            }

            console.log(`axios is run irrespective of abrakadabra`);
            axios
              .delete("chapter", {
                params: { chapterId: props.deleteId },
              })
              .then((res) => {
                setValue("");
                props.setDeleteId("");
                props.setChapterD(!props.chapterD);
                props.setLoader(false);
              })
              .catch((err) => console.log(err));
          }}
        />
        <PeachBtn
          name={"Cancel"}
          action={() => {
            setValue("");
            props.setDeleteId("");
            props.setChapterD(!props.chapterD);
          }}
        />
      </div>
    </div>
  );
}
