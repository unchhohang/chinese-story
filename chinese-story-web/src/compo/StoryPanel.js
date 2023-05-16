// Story Main control panel

import axios from "axios";
import React, { useRef, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import PeachBtn from "./PeachBtn";
import TableContentM from "./TableContentM";
import TagBtn from "./TagBtn";
import { GridLoader } from "react-spinners";
import StoryDeletePop from "./StoryDeletePop";
import CustomToggleBtn from "./CustomToggleBtn";

export default function StoryPanel() {
  // loader data for story
  const { data } = useLoaderData();
  const [story, setStory] = useState(data);

  // State hooks for title
  // when state disable input field is locked
  // button is named as edit
  const [titleValue, setTitleValue] = useState(story.title);
  const [titleDisable, setTitleDisable] = useState(true);

  // Author value and disables
  const [authorValue, setAuthorValue] = useState(
    story.author === undefined ? "" : story.author
  );
  const [authorDisable, setAuthorDisable] = useState(true);

  // State hook for synopsis
  const [synopsis, setSynopsis] = useState(
    story.synopsis === undefined ? "" : story.synopsis
  );
  const [synopsisDisable, setSynopsisDisable] = useState(true);

  // State hook for rating
  const [rating, setRating] = useState(story.rating);

  // state for tags pop up
  // const [tagPopState, setTagPopState] = useState(false);

  // tags
  const tags = ["action", "mystrey", "comedy", "romance"];
  // selected tag
  const [tagged, setTagged] = useState(story.tags);
  const [selectTag, setSelectTag] = useState(tags[0]);

  // cover image
  const [imageFile, setImageFile] = useState(null);
  // image grid spinner
  const [imgUploadSpinner, setImgUploadSpinner] = useState(false);

  // story delete pop display
  const [storyDPop, setStoryDPop] = useState(false);

  // story status ['onGoing' , 'complete']
  const [storyStatus, setStoryStatus] = useState(story.status);
  const [checked, setChecked] = useState(
    story.status === "onGoing" ? false : true
  );

  // options for tags
  const tagOptions = tags.map((i) => {
    return <option>{i}</option>;
  });

  // image upload section
  // here so that I can be creative
  // in image load rendering
  const imageSection = (
    <>
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
        }}
      >
        <img
          src={
            story.coverImageUrl?.url === undefined
              ? "https://i.pinimg.com/originals/4d/26/51/4d26510d64f0c71ec38abf47d0087101.jpg"
              : story.coverImageUrl.url
          }
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
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                setImageFile(e.target);
              }}
            />
          </span>
          <PeachBtn
            name={"upload"}
            action={() => {
              coverImageUpload();
            }}
          />
        </div>
      </div>
    </>
  );

  // render tags
  const renderTags = tagged.map((x, i) => {
    return (
      <TagBtn
        key={i}
        storyId={story._id}
        name={x}
        tagged={tagged}
        setTagged={setTagged}
      />
    );
  });

  function onTitleEditClicked() {
    if (titleDisable) {
      setTitleDisable(!titleDisable);

      return;
    }
    setTitleDisable(!titleDisable);

    console.log(`title value `);
    console.log(titleValue);

    // save to db
    axios
      .patch("/story/title", {
        storyId: story._id,
        title: titleValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  }

  function onAuthorEditClicked() {
    if (authorDisable) {
      setAuthorDisable(!authorDisable);
      return;
    }
    setAuthorDisable(!authorDisable);
    axios
      .patch("/story/author", {
        storyId: story._id,
        author: authorValue,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  function onSynopsisEditClicked() {
    if (synopsisDisable) {
      setSynopsisDisable(!synopsisDisable);
      return;
    }
    axios
      .patch("/story/synopsis", {
        storyId: story._id,
        synopsis: synopsis,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setSynopsisDisable(!synopsisDisable);
    return;
  }

  function coverImageUpload() {
    // initate load spinner
    setImgUploadSpinner(true);
    const formData = new FormData();
    formData.append("storyId", story._id);
    formData.append("image", imageFile.files[0]);

    axios
      .patch("/story/image", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        console.log(`spinner should be closed`);
        setStory(res.data);
        setImgUploadSpinner(false);
      })
      .catch((err) => console.log(err));
  }

  // status change from "onGoing" <--> "complete" vice versa
  function changeStatus(status) {
    axios
      .patch("/story/status", {
        storyId: story._id,
        status: status,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {storyDPop && (
        <StoryDeletePop storyId={story._id} setStoryDPop={setStoryDPop} />
      )}
      <div style={{ pointerEvents: storyDPop && "none" }}>
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
              action={(e) => {
                onTitleEditClicked();
              }}
            />
          </div>
        </div>

        {/* Here author part */}

        <div style={{ display: "table-row" }}>
          <div style={{ display: "table-cell" }}>
            <h4 style={{ textAlign: "center" }}>Author</h4>
          </div>

          <div style={{ display: "table-cell" }}>
            <input
              disabled={authorDisable}
              style={{
                padding: "6px",
                margin: "10px",
                width: "40vw",
              }}
              value={authorValue}
              onChange={(e) => {
                setAuthorValue(e.target.value);
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
              name={authorDisable ? "Edit" : "save"}
              action={(e) => {
                onAuthorEditClicked();
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
              onChange={async (e) => {
                setRating(e.target.value);
                // save change to db
                await axios.patch("/story/rating", {
                  storyId: story._id,
                  rating: e.target.value,
                });
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
            {/* list of tags rendered */}
            {renderTags}
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
                  onChange={(e) => {
                    setSelectTag(e.target.value);
                  }}
                >
                  {tagOptions}
                </select>
              </span>
              <span>
                <PeachBtn
                  name={"add-tag"}
                  action={() => {
                    // add tag to db
                    // then render tag list

                    axios
                      .patch("/story/tag", {
                        storyId: story._id,
                        tag: selectTag,
                      })
                      .then((res) => {
                        setTagged(res.data.tags);
                      })
                      .catch((err) => console.log(err));
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
          {imgUploadSpinner ? (
            <div
              style={{
                margin: "10px",
                padding: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GridLoader color="#F4B886" />
            </div>
          ) : (
            imageSection
          )}
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
              Status
            </h4>
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
                flexDirection: "row",
              }}
            >
              <span
                style={{
                  position: "relative",
                  top: "12px",
                }}
              >
                <CustomToggleBtn
                  checked={checked}
                  onClicked={() => {
                    setChecked(!checked);
                    let newStatus = checked ? "onGoing" : "complete";
                    changeStatus(newStatus);
                  }}
                />
              </span>
              <span style={{ marginLeft: "10px" }}>
                <h4>Complete</h4>
              </span>
            </div>
          </div>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
            }}
          ></div>
        </div>
      </div>
      <TableContentM story={story} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PeachBtn
          name={"Delete"}
          action={() => {
            setStoryDPop(true);
          }}
        />
      </div>
    </div>
  );
}
