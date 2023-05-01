// Create story pop up

import React from "react";
import BeaverBtn from "./BeaverBtn";

export default function () {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          backgroundColor: "#F4B886",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Title </h2>
          <input style={{ padding: "10px", width:"40vw", marginBottom: "20px"}}></input>
          <div>
            <BeaverBtn 
                name={"OK"}
                action={()=>{console.log('capibara');}}
            />
            <BeaverBtn 
                name={"Cancel"}
                action={()=>{console.log(`capibara`);}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
