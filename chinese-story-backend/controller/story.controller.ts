// All in one controller may be

import { Request, Response } from "express";
import chapterDao from "../dao/chapter.dao";
import storyDao from "../dao/story.dao";

const cloudianry = require("cloudinary").v2;

cloudianry.config({
  cloud_name: "dikro85u1",
  api_key: "744546673993993",
  api_secret: "RBloFuu-0GwmWoNX1srGeH-Kl-4",
});

// Create story title
export async function createStory(req: Request, res: Response) {
  const story = await storyDao.createStory(req.body.title);
  res.sendStatus(story);
}

export async function getStory(req: Request, res: Response) {
  const story: any = await storyDao.getStory(String(req.query.storyId));
  res.send(story);
}

export async function getStoriesByCat(req: Request, res: Response) {
  const stories: any = await storyDao.getStoriesByCat(String(req.query.tag));
  res.send(stories);
}

export async function getStories(req: Request, res: Response) {
  const stories: any = await storyDao.getStories();
  res.send(stories);
}

export async function getChapterByStoryId(req: Request, res: Response) {
  const chapters: any = await chapterDao.readByStoryId(
    String(req.query.storyId)
  );
  res.send(chapters);
}

export async function updateTitle(req: Request, res: Response) {
  const update = await storyDao.updateTitle(
    String(req.body.storyId),
    String(req.body.title)
  );
  res.send(update);
}

export async function updateAuthor(req: Request, res: Response) {
  const update = await storyDao.updateAuthor(
    String(req.body.storyId),
    String(req.body.author)
  );
  res.send(update);
}

export async function updateRating(req: Request, res: Response) {
  const update = await storyDao.updateRating(
    String(req.body.storyId),
    req.body.rating
  );
  res.send(update);
}

export async function updateSynopsis(req: Request, res: Response) {
  const update = await storyDao.updateSynopsis(
    String(req.body.storyId),
    req.body.synopsis
  );
  res.send(update);
}

// updated story status ['onGoing' , 'complete']
export async function updateStatus(req: Request, res: Response) {
  const update = await storyDao.updateStatus(
    String(req.body.storyId),
    req.body.status
  );
  res.send(update);
}

// upload image
export async function uploadImage(req: Request, res: Response) {
  try {
    const storyId: string = req.body.storyId;
    const story: any = await storyDao.getStory(storyId);
    const publicId: string = story.coverImageUrl.public_id;

    // delete old image to replace with new one

    // this may be a bad code . For skipping things
    cloudianry.uploader.destroy(publicId, (res: any) => {
      console.log(res);
    });

    console.log(`after destroy`);

    const result = await cloudianry.uploader.upload(req.file?.path, {
      folder: "chinese-story",
    });

    // console.log(`result of cloudinary upload`);
    // console.log(result);

    const update = await storyDao.updateImageUrl(
      storyId,
      result.secure_url,
      result.public_id
    );
    res.send(update);
  } catch (err) {
    console.log(err);
  }
}

export async function addTag(req: Request, res: Response) {
  const update = await storyDao.pushTag(String(req.body.storyId), req.body.tag);
  res.send(update);
}

export async function removeTag(req: Request, res: Response) {
  const update = await storyDao.removeTag(
    String(req.query.storyId),
    String(req.query.tag)
  );
  res.send(update);
}

export async function searchStory(req: Request, res: Response) {
  const result = await storyDao.searchStory(String(req.query.title));
  res.send(result);
}

// Delete story along with its related chapters

export async function deleteStory(req: Request, res: Response) {
  const storyId: string = String(req.query.storyId);

  // Delete chapters & story
  const chapters = await chapterDao.deleteChapters(storyId);
  const story = await storyDao.delete(storyId);
  res.send(story);
}
