// stories show panels for contents

import React from "react";
import StoryCard from "./StoryCard";

export default function Stories(props) {
  const stories = props.stories;

  const renderStories = stories.map((story, i) => {
    console.log(`render a story card`);
    console.log(story);
    return <StoryCard story={story} />;
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {renderStories}
    </div>
  );
}
