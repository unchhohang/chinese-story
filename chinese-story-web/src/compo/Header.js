/**
 * Header for website
 */

import React from "react";
import { Search, SearchOutline } from "react-ionicons";
import styles from "../css/header.module.css";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
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
                  paddingLeft: "35px"
                  
                }}
              />
            </div>
          </div>
        </div>

        {/* Drop down button  */}
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
            <button className={styles.categoryBtn}>Genres</button>
            <div className={styles.genresType}>
              <li>action</li>
              <li>action</li>
              <li>action</li>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "black", color: "white", height: "20vh" }}>
        <h1>Ads goes here...</h1>
      </div>
    </>
  );
}
