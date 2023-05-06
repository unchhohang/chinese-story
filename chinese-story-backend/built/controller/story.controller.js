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
exports.deleteStory = exports.searchStory = exports.removeTag = exports.addTag = exports.uploadImage = exports.updateSynopsis = exports.updateRating = exports.updateTitle = exports.getChapterByStoryId = exports.getStories = exports.getStory = exports.createStory = void 0;
const chapter_dao_1 = __importDefault(require("../dao/chapter.dao"));
const story_dao_1 = __importDefault(require("../dao/story.dao"));
const cloudianry = require("cloudinary").v2;
cloudianry.config({
    cloud_name: "dikro85u1",
    api_key: "744546673993993",
    api_secret: "RBloFuu-0GwmWoNX1srGeH-Kl-4",
});
// Create story title
function createStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const story = yield story_dao_1.default.createStory(req.body.title);
        res.sendStatus(story);
    });
}
exports.createStory = createStory;
function getStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const story = yield story_dao_1.default.getStory(String(req.query.storyId));
        res.send(story);
    });
}
exports.getStory = getStory;
function getStories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stories = yield story_dao_1.default.getStories();
        res.send(stories);
    });
}
exports.getStories = getStories;
function getChapterByStoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chapters = yield chapter_dao_1.default.readByStoryId(String(req.query.storyId));
        res.send(chapters);
    });
}
exports.getChapterByStoryId = getChapterByStoryId;
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
// upload image
function uploadImage(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storyId = req.body.storyId;
            const story = yield story_dao_1.default.getStory(storyId);
            const publicId = story.coverImageUrl.public_id;
            // delete old image to replace with new one
            // this may be a bad code . For skipping things
            cloudianry.uploader.destroy(publicId, (res) => {
                console.log(res);
            });
            console.log(`after destroy`);
            const result = yield cloudianry.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, {
                folder: "chinese-story",
            });
            // console.log(`result of cloudinary upload`);
            // console.log(result);
            const update = yield story_dao_1.default.updateImageUrl(storyId, result.secure_url, result.public_id);
            res.send(update);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.uploadImage = uploadImage;
function addTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.pushTag(String(req.body.storyId), req.body.tag);
        res.send(update);
    });
}
exports.addTag = addTag;
function removeTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield story_dao_1.default.removeTag(String(req.query.storyId), String(req.query.tag));
        res.send(update);
    });
}
exports.removeTag = removeTag;
function searchStory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield story_dao_1.default.searchStory(String(req.query.title));
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
