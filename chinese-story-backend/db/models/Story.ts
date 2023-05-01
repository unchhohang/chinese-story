// Story DB model

import mongoose, { Schema } from "mongoose";

const storySchema = new Schema({
  title: {require: true, type: String, unique: true},
  rating: {type: String, require: true, default: 0},
  coverImageUrl: String,
  tags: [String],
  synopsis: String,
  author: String,
});

const StoryModel = mongoose.model("Story", storySchema);

export { StoryModel as default };
