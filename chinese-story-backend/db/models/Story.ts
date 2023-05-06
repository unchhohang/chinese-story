// Story DB model

import mongoose, { Schema } from "mongoose";

const storySchema = new Schema({
  title: { require: true, type: String, unique: true },
  rating: { type: String, require: true, default: 0 },
  coverImageUrl: {
    url: { type: String, require: true },
    public_id: { type: String, require: true },
  },

  tags: [String],
  synopsis: String,
  author: String,
});

const StoryModel = mongoose.model("Story", storySchema);

export { StoryModel as default };
