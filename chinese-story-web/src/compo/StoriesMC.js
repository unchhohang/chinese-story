// Item for group selection in stories managment

import React from "react";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const navigate = useNavigate();
  const story = props.story;
  const title = story.title;
  const author = story.author === undefined ? "" : story.author;
  const imageUrl =
    story.coverImageUrl?.url === undefined
      ? "https://i.pinimg.com/564x/14/e8/d5/14e8d52f45a91b1488dff4d0396e799c.jpg"
      : story.coverImageUrl.url;

  function onStoriesCardClicked() {
    let url = "/managment/stories/" + story._id;
    // Last url section need to be set dynamic
    navigate(url);
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "10px",
        marginBottom: "15px",
        backgroundColor: "#F4B886",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        onStoriesCardClicked();
      }}
    >
      <div>
        <img src={imageUrl} height={"200vh"} width={"150vw"}></img>
      </div>
      <div>
        <div>
          <h2>&nbsp; {title}</h2>
          <h5>&nbsp;&nbsp;&nbsp; By: {author}</h5>
        </div>
      </div>
    </div>
  );
}
