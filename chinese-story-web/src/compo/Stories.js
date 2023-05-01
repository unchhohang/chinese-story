// stories show panels for contents

import React from "react";
import StoryCard from "./StoryCard";

export default function Stories() {
  return (
    < div style={{
      display: "flex",
      flexWrap: "wrap"
    }}>
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
    </div>
  );
}
