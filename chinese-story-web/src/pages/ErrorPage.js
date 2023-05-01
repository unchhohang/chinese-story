// Error Page

import React from "react";

export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          style={{ border: "10px solid black" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsu_m0t--Wjvmym1EdXqXs2b9MCpzihBPwTRCnv3FZNVPvwQ8Hxok1Lgn-EmPkOBikPao&usqp=CAU"
        />
        <h1
          style={{
            alignSelf: "center",
            fontFamily: "monospace",
            fontSize: "5vw",
          }}
        >
          OOps
        </h1>
      </div>
    </div>
  );
}
