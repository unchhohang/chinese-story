// Routes for storys and chapters

import { Application } from "express";
import multer from "multer";
import { createChapter, deleteChapter, readChapter, uploadChapter } from "../controller/chapter.controller";
import {
  addTag,
  createStory,
  deleteStory,
  removeTag,
  searchStory,
  updateImageUrl,
  updateRating,
  updateSynopsis,
  updateTitle,
} from "../controller/story.controller";

// config multer for suffix
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + "txt");
  },
});

const upload = multer({ storage: storage });

export function routingLikeAPro(app: Application) {
  app.route("/story").get(searchStory).post(createStory).delete(deleteStory);

  app.route("/story/title").patch(updateTitle);
  app.route("/story/rating").patch(updateRating);
  app.route("/story/synopsis").patch(updateSynopsis);
  app.route("/story/image").patch(updateImageUrl);
  app.route("/story/tag").patch(addTag).delete(removeTag);

  //TODO delete Story after chapters are deleted

  // Chapters routes too
  app.route("/chapter").get(readChapter).post(createChapter).delete(deleteChapter);

  app.route("/chapter/upload").post(upload.single("file"), uploadChapter);
}
