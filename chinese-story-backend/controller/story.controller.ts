// All in one controller may be

import { Request, Response } from "express";
import chapterDao from "../dao/chapter.dao";
import storyDao from "../dao/story.dao";
import Chapter from "../db/models/Chapter";

// Create story title
export async function createStory(req: Request, res: Response) {
  const story = await storyDao.createStory(req.body.title);
  res.sendStatus(story);
}

export async function updateTitle(req: Request, res: Response) {
  const update = await storyDao.updateTitle(
    String(req.body.storyId),
    String(req.body.title)
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

export async function updateImageUrl(req: Request, res: Response) {
  const update = await storyDao.updateImageUrl(
    String(req.body.storyId),
    req.body.coverImageUrl
  );
  res.send(update);
}

export async function addTag(req: Request, res: Response) {
  const update = await storyDao.pushTag(String(req.body.storyId), req.body.tag);
  res.send(update);
}

export async function removeTag(req: Request, res: Response) {
  const update = await storyDao.removeTag(
    String(req.body.storyId),
    req.body.tag
  );
  res.send(update);
}

export async function searchStory(req: Request, res: Response) {
  const result = await storyDao.searchStory(req.body.title);
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
