import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./App.css";
import Header from "./compo/Header";
import Stories from "./compo/Stories";

function App() {
  const data = useLoaderData();
  const [stories, setStories] = useState(data);

  return (
    <>
      <div>
        <Header setStories={setStories} />
        <Stories stories={stories} />
      </div>
    </>
  );
}

export default App;
