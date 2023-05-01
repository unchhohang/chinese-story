"use strict";
// DAO for mongodb
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
const Story_1 = __importDefault(require("../db/models/Story"));
class StoryDao {
    // create story by title
    createStory(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const story = new Story_1.default({ title: title });
                yield story.save();
                return 200;
            }
            catch (err) {
                throw new Error(err);
                return 500;
            }
        });
    }
    //add story details
    updateTitle(storyId, newTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: storyId };
            const update = { title: newTitle };
            const opts = { new: true };
            try {
                const updated = yield Story_1.default.findOneAndUpdate(filter, update, opts);
                return updated;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update rating
    updateRating(storyId, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: storyId };
            const update = { rating: newRating };
            const opts = { new: true };
            try {
                const updated = yield Story_1.default.findOneAndUpdate(filter, update, opts);
                return updated;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update cover image
    updateSynopsis(storyId, newSynop) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: storyId };
            const update = { synopsis: newSynop };
            const opts = { new: true };
            try {
                const updated = yield Story_1.default.findOneAndUpdate(filter, update, opts);
                return updated;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    updateImageUrl(storyId, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: storyId };
            const update = { coverImageUrl: imgUrl };
            const opts = { new: true };
            try {
                const updated = yield Story_1.default.findOneAndUpdate(filter, update, opts);
                return updated;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    pushTag(storyId, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield Story_1.default.findById(storyId);
                // find if tag already exist
                // if so don't insert just return 409
                const isIncluded = yield doc.tags.includes(tag);
                if (isIncluded) {
                    return 409;
                }
                doc.tags.push(tag);
                yield doc.save();
                return doc;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    removeTag(storyId, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield Story_1.default.findById(storyId);
                doc.tags.remove(tag);
                yield doc.save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    searchStory(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchReg = new RegExp(query, "ig");
            try {
                const result = yield Story_1.default.find({
                    title: { $regex: searchReg },
                });
                return result;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // Delete story by storyId
    delete(storyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield Story_1.default.findByIdAndRemove(storyId);
                return deleted;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = new StoryDao();
