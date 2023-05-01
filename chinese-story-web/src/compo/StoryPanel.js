// Story Main control panel

import React, { useRef, useState } from "react";
import DeleteWarn from "./DeleteWarn";
import PeachBtn from "./PeachBtn";
import TableContentM from "./TableContentM";
import TagsPop from "./TagsPop";

export default function StoryPanel() {
  // State hooks for title
  // when state disable input field is locked
  // button is named as edit
  const [titleValue, setTitleValue] = useState("");
  const [titleDisable, setTitleDisable] = useState(true);

  // State hook for synopsis
  const [synopsis, setSynopsis] = useState("");
  const [synopsisDisable, setSynopsisDisable] = useState(true);

  // State hook for rating
  const [rating, setRating] = useState(2);

  // state for tags pop up
  const [tagPopState, setTagPopState] = useState(false);

  // tags
  const tags = ["action", "mystrey", "comedy", "romance"];
  const [tagged, setTagged] = useState([]);

  // options for tags
  const tagOptions = tags.map((i) => {
    return <option>{i}</option>;
  });

  function onTitleEditClicked() {
    if (titleDisable) {
      setTitleDisable(!titleDisable);
      return;
    }
    setTitleDisable(!titleDisable);
    // save somewhere may be TODO
    return;
  }

  function onSynopsisEditClicked() {
    if (synopsisDisable) {
      setSynopsisDisable(!synopsisDisable);
      return;
    }
    setSynopsisDisable(!synopsisDisable);
    return;
  }

  return (
    <div>
      {/* create tags popup */}
      {tagPopState && (
        <div>
          <TagsPop />
        </div>
      )}

      <div
        style={
          tagPopState
            ? {
                display: "table",
                margin: "10px",
                padding: "10px",
                pointerEvents: "none",
              }
            : {
                display: "table",
                margin: "10px",
                padding: "10px",
                pointerEvents: "auto",
              }
        }
      >
        <div style={{ display: "table-row" }}>
          <div style={{ display: "table-cell" }}>
            <h4 style={{ textAlign: "center" }}>Title </h4>
          </div>

          <div style={{ display: "table-cell" }}>
            <input
              disabled={titleDisable}
              style={{
                padding: "6px",
                margin: "10px",
                width: "40vw",
              }}
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            ></input>
          </div>
          <div
            style={{
              display: "table-cell",
            }}
          >
            {/* Btn comp for title edit */}
            <PeachBtn
              name={titleDisable ? "Edit" : "save"}
              action={() => {
                onTitleEditClicked();
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "table-row",
          }}
        >
          <div
            style={{
              display: "table-cell",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Rating
            </h4>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <input
              type="number"
              min={0}
              max={5}
              style={{
                padding: "6px",
              }}
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            ></input>
          </div>
          {/* Empty to adjust */}
          <div
            style={{
              width: "20vw",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "table-row",
            verticalAlign: "middle",
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Tags
            </h4>
          </div>
          <div
            style={{
              border: "1px solid black",
              width: "40vw",
              height: "160px",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <span>#Action</span>
            <span>#Action</span>
            <span>#Action</span>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",

                margin: "10px",
                padding: "10px",
              }}
            >
              <span>
                <select
                  style={{
                    marginTop: "25px",
                  }}
                >
                  {tagOptions}
                </select>
              </span>
              <span>
                <PeachBtn
                  name={"Add"}
                  action={() => {
                    console.log(`pop up TODO`);
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "table-row",
          }}
        >
          <div
            style={{
              display: "table-cell",
              marginBottom: "50px",
              verticalAlign: "middle",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Cover Image
            </h4>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <img
              src="https://i.pinimg.com/474x/8b/a0/91/8ba0911243605e4072e8b69e52079e1a.jpg"
              height={"180vh"}
              style={{
                margin: "10px",
                padding: "10px",
              }}
            ></img>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <span
                style={{
                  margin: "25px",
                }}
              >
                <input type="file" accept="image/png, image/gif, image/jpeg" />
              </span>
              <PeachBtn
                name={"upload"}
                action={() => {
                  console.log("TODO upload");
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "table-row",
          }}
        >
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Synopsis
            </h4>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <textarea
              rows={12}
              cols={60}
              disabled={synopsisDisable}
              value={synopsis}
              onChange={(e) => {
                setSynopsis(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            <PeachBtn
              name={synopsisDisable ? "Edit" : "Save"}
              action={() => {
                onSynopsisEditClicked();
              }}
            />
          </div>
        </div>
      </div>
      <TableContentM />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PeachBtn
          name="Done"
          action={() => {
            console.log(`done`);
          }}
        />
        <PeachBtn
          name={"Delete"}
          action={() => {
            console.log("Delete");
          }}
        />
      </div>
    </div>
  );
}
