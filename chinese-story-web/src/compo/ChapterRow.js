// Chapter row for managment

import axios from "axios";
import React, { useState } from "react";
import PeachBtn from "./PeachBtn";

export default function ChapterRow(props) {
  const [fileUpload, setFileUpload] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <h3>{props.title}</h3>
      </div>
      <div>
        <input
          type="file"
          accept=".txt "
          style={{
            margin: "25px",
          }}
          onChange={(e) => {
            setFileUpload(e.target);
          }}
        ></input>
      </div>
      <div>
        <PeachBtn
          name={"upload"}
          action={() => {
            // Protection in case of empty
            if (fileUpload === "") {
              console.log("Nothing is there bro..");
              return;
            }
            const formData = new FormData();
            formData.append("file", fileUpload.files[0]);

            axios
              .post("http://localhost:5000/chapter/upload", formData, {
                headers: { "content-type": "multipart/form-data" },
              })
              .then((data) => console.log(data))
              .catch((err) => console.log(err));
          }}
        />
      </div>
      <div>
        <PeachBtn
          name={"Delete"}
          action={() => {
            props.setChapterD(!props.chapterD);
          }}
        />
      </div>
    </div>
  );
}
