// Chapter controller

import { Request, Response } from "express";
import chapterDao from "../dao/chapter.dao";
import textract from "textract";

export async function createChapter(req: Request, res: Response) {
  const chapter = await chapterDao.createChapter(
    req.body.storyId,
    req.body.chapterTitle
  );
  res.send(chapter);
}

export async function uploadChapter(req: Request, res: Response) {
  // path for downloaded file
  const filePath: string = String(req.file?.path);
  const chapterId: string = req.body.chapterId;

  textract.fromFileWithPath(
    filePath,
    { preserveLineBreaks: true },
    async (err, text) => {
      if (err) {
        console.log(err);
      } else {
        // Save chapter content to DB
        await chapterDao.uploadChapter(chapterId, text);
      }
    }
  );

  res.send(200);
}

// Read chapter by Id
export async function readChapter(req: Request, res: Response) {
  const chapter = await chapterDao.read(String(req.query.chapterId));
  res.send(chapter);
}

// Delete chapter by chapterId
export async function deleteChapter(req: Request, res: Response) {
  const deleted = await chapterDao.delete(String(req.query.chapterId));
  res.send(deleted);
}
