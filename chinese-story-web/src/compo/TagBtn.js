// button like things for tags
// for creation and deletion

import axios from "axios";
import React from "react";
import { CloseCircleOutline } from "react-ionicons";

export default function TagBtn(props) {
  return (
    <span
      style={{
        backgroundColor: "#A18276",
        margin: "10px",
        padding: "5px",
        color: "#FFFFFF",
        borderRadius: "20px",
      }}
    >
      #{props.name}{" "}
      <span
        style={{
          position: "relative",
          top: "5px",
        }}
      >
        <CloseCircleOutline
          onClick={() => {
            // delete item and upadate
            // tag render list
            let tagged = props.tagged;
            let filteredTagged = tagged.filter((x) => x !== props.name);
            props.setTagged(filteredTagged);

            axios
              .delete("/story/tag", {
                params: {
                  storyId: props.storyId,
                  tag: props.name,
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          }}
          color={"#00000"}
          //   height="250px"
          //   width="250px"
        />
      </span>
    </span>
  );
}
