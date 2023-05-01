// Chapter schema

import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema({
  storyId: mongoose.SchemaTypes.ObjectId,
  chapterTitle: String,
  chapterContent: String,
});

const ChapterModel = mongoose.model("Chapter", chapterSchema);

export { ChapterModel as default };
