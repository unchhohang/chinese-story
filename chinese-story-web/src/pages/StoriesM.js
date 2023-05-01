// Stories Managment page

import React, { useEffect, useState } from "react";
import { SearchOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import pass from "../helpers/authPass";
import styles from "../css/storiesM.module.css";
import StoriesMC from "../compo/StoriesMC";
import CreateStoriesPop from "../compo/createStoriesPop";
import axios from "axios";
import { MoonLoader } from "react-spinners";

export default function StoriesM() {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    // If not pass redirect to managment password page
    // LOL

    console.log(`should re run `);
    console.log(refresh);
    if (!pass()) {
      console.log(`here it's not suppose to pass`);
      navigate("/managment");
    }
    getStories();
  }, [refresh]);

  function getStories() {
    axios
      .get("/story")
      .then((res) => {
        console.log(`get stories`);
        console.log(res.data);
        setStories(res.data);})
      .catch((err) => console.log(err));
  }

  const renderStories = stories.map((x, i) => {
    return (
      <StoriesMC
        key={i}
        title={x.title}
        author={x.author === undefined ? "" : x.author}
        coverImageUrl={
          x.coverImageUrl === undefined
            ? "https://i.pinimg.com/564x/14/e8/d5/14e8d52f45a91b1488dff4d0396e799c.jpg"
            : x.coverImageUrl
        }
      />
    );
  });

  return (
    <div>
      {popUp && (
        <div>
          <CreateStoriesPop
            popUp={popUp}
            setPopUp={setPopUp}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      )}
      <div
        style={popUp ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
      >
        <div className={styles.search}>
          <div>
            <span
              style={{
                position: "absolute",
                padding: "2px",
                marginTop: "4px",
                marginLeft: "6px",
                content: " ",
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
                width: "40vw",
              }}
              value={search}
              onChange={(e) => {
                let query = e.target.value;
                setSearch(query);
                // Set loader according to search query

                if (query === "") {
                  console.log(`empty search query active`);
                  setRefresh(!refresh);
                } else {
                  setSpinner(true);
                  // Search Query
                  axios
                    .get("/stories", { params: { title: query } })
                    .then((res) => {
                      setStories(res.data);
                      setSpinner(false);
                    })
                    .catch((err) => console.log(err));
                }
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-12px",
          }}
        >
          <button
            style={{
              padding: "14px",
              width: "150px",
              paddingRight: "14px",
              paddingLeft: "14px",
              backgroundColor: "#A18276",
              borderRadius: "22px",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={() => {
              setPopUp(true);
            }}
          >
            new
          </button>
        </div>
        {spinner ? (
          <div
            style={{
              display: "flex",
              height: "50vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MoonLoader loading={spinner} />
          </div>
        ) : (
          <div>{renderStories}</div>
        )}
      </div>
    </div>
  );
}
