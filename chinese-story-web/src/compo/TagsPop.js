// Pop up for tags creation

import React, { useState } from "react";
import PeachBtn from "./PeachBtn";

export default function () {
  const optList = ["action", "romance", "comedy", "revenge"];
  const [opts, setOpts] = useState(optList[0]);

  const options = optList.map((i) => {
    return <option onClick={() => setOpts(i)}>{i}</option>;
  });

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#A18276",

        left: "25%",
        top: "30%",

        border: "1px solid #011627",
        boxShadow: "-2px 5px 5px #E71D36",

        margin: "10px",
        padding: "20px",
      }}
    >
      <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
        <h2>Add tags</h2>
        <div>
          <select>{options}</select>
        </div>
        <div>
          <PeachBtn
            name={"Ok"}
            action={() => {
              console.log("ok");
            }}
          />
          <PeachBtn
            name={"Cancel"}
            action={() => {
              console.log("Cancel");
            }}
          />
        </div>
      </div>
    </div>
  );
}
