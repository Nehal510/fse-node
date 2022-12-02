"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef TuitSchema Represents tuits
 * @property tuit represents tuit
 * @property postedOn represents the date on which the tuit was posted
 * @property postedBy represents the user who has posted the tuit
 */
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel", required: true },
}, { collection: 'tuits' });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map