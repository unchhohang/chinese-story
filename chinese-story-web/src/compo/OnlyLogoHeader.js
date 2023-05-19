// only logo header

import React from "react";
import styles from "../css/header.module.css";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";
import HeaderAds from "./HeaderAds";

export default function OnlyLogoHeader() {
  const navigation = useNavigate();

  return (
    <div>
      <div className={styles.logo}>
        <img
          src={logo}
          alt={"logo"}
          height="50em"
          width="160em"
          onClick={() => {
            navigation("/");
          }}
        />
      </div>
      <HeaderAds />
    </div>
  );
}
