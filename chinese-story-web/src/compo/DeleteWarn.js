// Pop up component for delete warning
// Password is abrakadabra

import React, { useState } from "react";
import PeachBtn from "./PeachBtn";

export default function () {
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
            console.log("should delete");
          }}
        />
        <PeachBtn
          name={"Cancel"}
          action={() => {
            console.log("should Cancel this pop");
          }}
        />
      </div>
    </div>
  );
}
