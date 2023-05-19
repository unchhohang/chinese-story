// DAO for Chapter

import { log } from "node:console";
import Chapter from "../db/models/Chapter";

class ChapterDao {
  // Create chapter with Title only
  async createChapter(storyId: string, title: string) {
    try {
      const chapter: any = new Chapter({
        chapterTitle: title,
        storyId: storyId,
      });
      await chapter.save();
      return chapter;
    } catch (err) {
      console.log(err);
    }
  }

  // Upload Chapter
  async uploadChapter(chapterId: string, content: string) {
    const filter = { _id: chapterId };
    const update = { chapterContent: content };
    const opts = { new: true };
    try {
      const updated: any = await Chapter.findOneAndUpdate(filter, update, opts);
      return updated;
    } catch (err) {
      console.log(err);
    }
  }

  // read chapter by chapterId
  async read(chapterId: string) {
    try {
      const chapter = await Chapter.findById(chapterId).exec();
      return chapter;
    } catch (err) {
      console.log(err);
    }
  }

  async readByStoryId(storyId: string) {
    try {
      const chapters = await Chapter.find({ storyId: storyId });
      return chapters;
    } catch (err) {
      console.log(err);
    }
  }

  // get all chapters by storyId
  // but don't retrive chapterContent

  async getChaptersLimited(storyId: string) {
    try {
      const chapters = await Chapter.find(
        { storyId: storyId },
        "_id storyId chapterTitle"
      );
      return chapters;
    } catch (err) {
      console.log(err);
    }
  }

  // Get front and back chapter of a chapter

  async getFrontBack(storyId: string, chapterId: string) {
    try {
      const ltChapters = await Chapter.find(
        { _id: { $lt: chapterId }, storyId: storyId },
        "_id"
      );
      const gtChapters = await Chapter.find(
        { _id: { $gt: chapterId }, storyId: storyId },
        "_id"
      );
      const backChapter = ltChapters[ltChapters.length - 1];
      const frontChapter = gtChapters[0];

      return {
        frontChapter: frontChapter,
        backChapter: backChapter,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // Delete chapter by chapterId
  async delete(chapterId: string) {
    try {
      const deleted: any = await Chapter.findByIdAndRemove(chapterId);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }

  // Delete chpaters by storyId
  async deleteChapters(storyId: string) {
    try {
      const deleted: any = await Chapter.deleteMany({
        storyId: storyId,
      });
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ChapterDao();
