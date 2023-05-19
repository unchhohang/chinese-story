"use strict";
// Chapter controller
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteChapter = exports.readChapter = exports.getFrontBackChapter = exports.getChapterLimited = exports.uploadChapter = exports.createChapter = void 0;
const chapter_dao_1 = __importDefault(require("../dao/chapter.dao"));
const textract_1 = __importDefault(require("textract"));
const fs = __importStar(require("node:fs/promises"));
function createChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chapter = yield chapter_dao_1.default.createChapter(req.body.storyId, req.body.chapterTitle);
        res.send(chapter);
    });
}
exports.createChapter = createChapter;
function uploadChapter(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // path for downloaded file
        const filePath = String((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const chapterId = req.body.chapterId;
        textract_1.default.fromFileWithPath(filePath, { preserveLineBreaks: true }, (err, text) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
            }
            else {
                // Save chapter content to DB
                yield chapter_dao_1.default.uploadChapter(chapterId, text);
                // Delete read file.
                yield fs.unlink(filePath);
                console.log(`file deleted on path : ${filePath}`);
            }
        }));
        res.send(200);
    });
}
exports.uploadChapter = uploadChapter;
// Get chapter for chapter table
// chapter content not included
function getChapterLimited(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chapters = yield chapter_dao_1.default.getChaptersLimited(String(req.query.storyId));
        res.send(chapters);
    });
}
exports.getChapterLimited = getChapterLimited;
function getFrontBackChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chapter = yield chapter_dao_1.default.getFrontBack(String(req.query.storyId), String(req.query.chapterId));
        res.send(chapter);
    });
}
exports.getFrontBackChapter = getFrontBackChapter;
// Read chapter by Id
function readChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chapter = yield chapter_dao_1.default.read(String(req.query.chapterId));
        res.send(chapter);
    });
}
exports.readChapter = readChapter;
// Delete chapter by chapterId
function deleteChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield chapter_dao_1.default.delete(String(req.query.chapterId));
        res.send(deleted);
    });
}
exports.deleteChapter = deleteChapter;
