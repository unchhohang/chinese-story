"use strict";
// Chapter controller
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
exports.deleteChapter = exports.readChapter = exports.uploadChapter = exports.createChapter = void 0;
const chapter_dao_1 = __importDefault(require("../dao/chapter.dao"));
const textract_1 = __importDefault(require("textract"));
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
            }
        }));
        res.send(200);
    });
}
exports.uploadChapter = uploadChapter;
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
