import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StoryPage from "./pages/StoryPage";
import ErrorPage from "./pages/ErrorPage";
import Reading from "./pages/Reading";
import CPLoginPage from "./pages/CPLoginPage";
import StoriesM from "./pages/StoriesM";
import StoriesMC from "./compo/StoriesMC";
import StoryPanel from "./compo/StoryPanel";
import "./config/axios.config.js";
import axios from "axios";

// Routing by react router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/story",
    element: <StoryPage />,
  },
  {
    path: "/story/reading",
    element: <Reading />,
  },
  {
    path: "/managment/",
    element: <CPLoginPage />,
  },
  {
    path: "/managment/stories",
    element: <StoriesM />,
  },
  {
    path: "/managment/stories/:storyId",
    element: <StoryPanel />,
    loader: async ({ params }) => {
      let storyId = params.storyId;
      console.log(`params in loader`);
      console.log(storyId);
      let story = await axios.get("/story", {
        params: {
          storyId: storyId,
        },
      });
      return story;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
