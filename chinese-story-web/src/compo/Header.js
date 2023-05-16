/**
 * Header for website
 */

import React, { useState } from "react";
import { Search, SearchOutline } from "react-ionicons";
import styles from "../css/header.module.css";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header(props) {
  const genres = ["all", "action", "mystery", "comedy", "romance"];

  const renderGenres = genres.map((type, i) => {
    return (
      <li
        key={i}
        onClick={() => {
          getStoriesByCat(type);
        }}
      >
        {type}
      </li>
    );
  });

  // get all stories
  // set to Stories state
  function resetStories() {
    axios
      .get("/stories")
      .then((res) => {
        props.setStories(res.data);
      })
      .catch((err) => console.log(err));
  }

  // search named story
  // in case of empty string render normal all
  function searchStory(query) {
    // set all stories
    if (query === "") {
      resetStories();
      return;
    }

    axios
      .get("/stories/search", { params: { title: query } })
      .then((res) => {
        props.setStories(res.data);
      })
      .catch((err) => console.log(err));

    return;
  }

  // set state of Stories by categories in tag
  function getStoriesByCat(category) {
    if (category === "all") {
      resetStories();
      return;
    }
    axios
      .get("/stories/tag", {
        params: {
          tag: category,
        },
      })
      .then((res) => {
        props.setStories(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <div className={styles.container}>
          <div>
            <img src={logo} alt={"logo"} height="50em" width="160em" />
          </div>
          <div className={styles.searchContainer}>
            <div>
              <span
                style={{
                  position: "absolute",
                  padding: "2px",
                  marginTop: "4px",
                  marginLeft: "6px",
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
                }}
                onChange={(e) => {
                  searchStory(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/* Drop down button  */}
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
            <button className={styles.categoryBtn}>Genres</button>
            <div className={styles.genresType}>{renderGenres}</div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
          color: "white",
          height: "20vh",
        }}
      >
        <h1>Ads goes here...</h1>
      </div>
    </>
  );
}
