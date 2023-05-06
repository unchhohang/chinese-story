"use strict";
// Routes for storys and chapters
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingLikeAPro = void 0;
const multer_1 = __importDefault(require("multer"));
const chapter_controller_1 = require("../controller/chapter.controller");
const story_controller_1 = require("../controller/story.controller");
// config multer for suffix
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "." + "txt");
    },
});
const upload = (0, multer_1.default)({ storage: storage });
function routingLikeAPro(app) {
    app.route("/story").get(story_controller_1.getStory).post(story_controller_1.createStory).delete(story_controller_1.deleteStory);
    app.route("/stories").get(story_controller_1.getStories);
    app.route("/stories/search").get(story_controller_1.searchStory);
    app.route("/story/title").patch(story_controller_1.updateTitle);
    app.route("/story/rating").patch(story_controller_1.updateRating);
    app.route("/story/synopsis").patch(story_controller_1.updateSynopsis);
    app.route("/story/image").patch(upload.single("image"), story_controller_1.uploadImage);
    app.route("/story/tag").patch(story_controller_1.addTag).delete(story_controller_1.removeTag);
    //TODO delete Story after chapters are deleted
    // Chapters routes too
    app
        .route("/chapter")
        .get(chapter_controller_1.readChapter)
        .post(chapter_controller_1.createChapter)
        .delete(chapter_controller_1.deleteChapter);
    app.route("/chapter/stories").get(story_controller_1.getChapterByStoryId);
    app.route("/chapter/upload").post(upload.single("file"), chapter_controller_1.uploadChapter);
}
exports.routingLikeAPro = routingLikeAPro;
