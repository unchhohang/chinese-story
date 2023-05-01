/**
 * Login in page for content managment
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CPLoginPage() {
  const navigate = useNavigate();
  const pass = "wow";
  const [input, setInput] = useState("");

  // false message display cause trump is false
  // I don't hate trump just a gag
  const [trump, setTrump] = useState(false);

  function onHandleChange(e) {
    setInput(e.target.value);
  }

  // store in session and navigate
  function onPress() {
    // just a blind case
    // to pass in wow, or
    // toast "you are wrong"

    if (input === "wow") {
      // navigate and store it in session storage
      sessionStorage.setItem("password", input);
      navigate("/managment/stories");
      setTrump(false);
    } else {
      // show image "you are wrong"
      setTrump(true);
    }
  }

  // On key down fucntion
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
        onPress();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "20px",
        }}
      >
        password: <input value={input} onChange={onHandleChange} onKeyDown={handleKeyDown} />{" "}
        <button onClick={onPress}>ok</button>
      </div>
      {trump && (
        <div>
          <img
            src="https://media2.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif"
            alt="funny gif for error in password"
          />
        </div>
      )}
    </div>
  );
}
