"use strict";
// All in one controller may be
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
exports.deleteStory = exports.searchStory = exports.removeTag = exports.addTag = exports.updateImageUrl = exports.updateSynopsis = exports.updateRating = exports.updateTitle = exports.createStory = void 0;
const chapter_dao_1 = __importDefault(require("../dao/chapter.dao"));
const story_dao_1 = __importDefault(require("../dao/story.dao"));
// Create story title
function createStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const story = yield story_dao_1.default.createStory(req.body.title);
        res.sendStatus(story);
    });
}
exports.createStory = createStory;
function updateTitle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.updateTitle(String(req.body.storyId), String(req.body.title));
        res.send(update);
    });
}
exports.updateTitle = updateTitle;
function updateRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.updateRating(String(req.body.storyId), req.body.rating);
        res.send(update);
    });
}
exports.updateRating = updateRating;
function updateSynopsis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.updateSynopsis(String(req.body.storyId), req.body.synopsis);
        res.send(update);
    });
}
exports.updateSynopsis = updateSynopsis;
function updateImageUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.updateImageUrl(String(req.body.storyId), req.body.coverImageUrl);
        res.send(update);
    });
}
exports.updateImageUrl = updateImageUrl;
function addTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.pushTag(String(req.body.storyId), req.body.tag);
        res.send(update);
    });
}
exports.addTag = addTag;
function removeTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.removeTag(String(req.body.storyId), req.body.tag);
        res.send(update);
    });
}
exports.removeTag = removeTag;
function searchStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield story_dao_1.default.searchStory(req.body.title);
        res.send(result);
    });
}
exports.searchStory = searchStory;
// Delete story along with its related chapters
function deleteStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storyId = String(req.query.storyId);
        // Delete chapters & story
        const chapters = yield chapter_dao_1.default.deleteChapters(storyId);
        const story = yield story_dao_1.default.delete(storyId);
        res.send(story);
    });
}
exports.deleteStory = deleteStory;
