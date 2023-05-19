// Chapter controller

import { Request, Response } from "express";
import chapterDao from "../dao/chapter.dao";
import textract from "textract";
import * as fs from "node:fs/promises";

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

        // Delete read file.
        await fs.unlink(filePath);
        console.log(`file deleted on path : ${filePath}`);
      }
    }
  );

  res.send(200);
}

// Get chapter for chapter table
// chapter content not included

export async function getChapterLimited(req: Request, res: Response) {
  const chapters = await chapterDao.getChaptersLimited(
    String(req.query.storyId)
  );
  res.send(chapters);
}

export async function getFrontBackChapter(req: Request, res: Response) {
  const chapter = await chapterDao.getFrontBack(
    String(req.query.storyId),
    String(req.query.chapterId)
  );
  res.send(chapter);
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
