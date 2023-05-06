"use strict";
// DAO for Chapter
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chapter_1 = __importDefault(require("../db/models/Chapter"));
class ChapterDao {
    // Create chapter with Title only
    createChapter(storyId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chapter = new Chapter_1.default({
                    chapterTitle: title,
                    storyId: storyId,
                });
                yield chapter.save();
                return chapter;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // Upload Chapter
    uploadChapter(chapterId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: chapterId };
            const update = { chapterContent: content };
            const opts = { new: true };
            try {
                const updated = yield Chapter_1.default.findOneAndUpdate(filter, update, opts);
                return updated;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // read chapter by chapterId
    read(chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chapter = yield Chapter_1.default.findById(chapterId).exec();
                return chapter;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    readByStoryId(storyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chapters = yield Chapter_1.default.find({ storyId: storyId });
                return chapters;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // Delete chapter by chapterId
    delete(chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield Chapter_1.default.findByIdAndRemove(chapterId);
                return deleted;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // Delete chpaters by storyId
    deleteChapters(storyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield Chapter_1.default.deleteMany({
                    storyId: storyId,
                });
                return deleted;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = new ChapterDao();
