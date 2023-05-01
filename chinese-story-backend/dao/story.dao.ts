// DAO for mongodb

import Story from "../db/models/Story";

class StoryDao {
  // create story by title
  async createStory(title: string) {
    try {
      const story = new Story({ title: title });
      await story.save();
      return 200;
    } catch (err: any) {
      return 500;
    }
  }

  // GET  stories
  async getStories() {
    try {
      const stories: any = await Story.find({});
      return stories
    } catch (err) {
      console.log(err);
    }
  }

  //add story details
  async updateTitle(storyId: string, newTitle: string) {
    const filter = { _id: storyId };
    const update = { title: newTitle };
    const opts = { new: true };

    try {
      const updated: any = await Story.findOneAndUpdate(filter, update, opts);
      return updated;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  // update rating
  async updateRating(storyId: string, newRating: number) {
    const filter = { _id: storyId };
    const update = { rating: newRating };
    const opts = { new: true };

    try {
      const updated: any = await Story.findOneAndUpdate(filter, update, opts);
      return updated;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  // update cover image
  async updateSynopsis(storyId: string, newSynop: string) {
    const filter = { _id: storyId };
    const update = { synopsis: newSynop };
    const opts = { new: true };

    try {
      const updated: any = await Story.findOneAndUpdate(filter, update, opts);
      return updated;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateImageUrl(storyId: string, imgUrl: string) {
    const filter = { _id: storyId };
    const update = { coverImageUrl: imgUrl };
    const opts = { new: true };

    try {
      const updated: any = await Story.findOneAndUpdate(filter, update, opts);
      return updated;
    } catch (err: any) {
      console.log(err);
    }
  }

  async pushTag(storyId: string, tag: string) {
    try {
      const doc: any = await Story.findById(storyId);

      // find if tag already exist
      // if so don't insert just return 409
      const isIncluded: boolean = await doc.tags.includes(tag);

      if (isIncluded) {
        return 409;
      }
      doc.tags.push(tag);
      await doc.save();
      return doc;
    } catch (err) {
      console.log(err);
    }
  }

  async removeTag(storyId: string, tag: string) {
    try {
      const doc: any = await Story.findById(storyId);
      doc.tags.remove(tag);
      await doc.save();
    } catch (err) {
      console.log(err);
    }
  }

  async searchStory(query: string) {
    const searchReg = new RegExp(query, "ig");
    try {
      const result: any = await Story.find({
        title: { $regex: searchReg },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // Delete story by storyId
  async delete(storyId: string) {
    try {
      const deleted: any = await Story.findByIdAndRemove(storyId);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new StoryDao();
