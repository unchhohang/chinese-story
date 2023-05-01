// Stories Managment page

import React, { useEffect, useState } from "react";
import { SearchOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import pass from "../helpers/authPass";
import styles from "../css/storiesM.module.css";
import StoriesMC from "../compo/StoriesMC";
import CreateStoriesPop from "../compo/createStoriesPop";

export default function StoriesM() {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    // If not pass redirect to managment password page
    // LOL
    if (!pass()) {
      console.log(`here it's not suppose to pass`);
      navigate("/managment");
    }
  });
  return (
    <div>
      {popUp && (
        <div>
          <CreateStoriesPop />
        </div>
      )}
      <div
        style={popUp ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
      >
        <div className={styles.search}>
          <div>
            <span
              style={{
                position: "absolute",
                padding: "2px",
                marginTop: "4px",
                marginLeft: "6px",
                content: " ",
              }}
            >
              <SearchOutline
                color={"#00000"}
                title={"none"}
                height="26px"
                width="26px"
              />
            </span>
            <input
              id="searchQuery"
              style={{
                borderRadius: "20px",
                borderColor: "#000000",
                backgroundColor: "#FBF7F7",
                padding: "10px",
                paddingLeft: "35px",
                width: "40vw",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-12px",
          }}
        >
          <button
            style={{
              padding: "14px",
              width: "150px",
              paddingRight: "14px",
              paddingLeft: "14px",
              backgroundColor: "#A18276",
              borderRadius: "22px",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={()=>{setPopUp(true)}}
          >
            new
          </button>
        </div>
        <div>
          <StoriesMC />
          <StoriesMC />
          <StoriesMC />
        </div>
      </div>
    </div>
  );
}
