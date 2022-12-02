"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarkSchema_1 = __importDefault(require("./BookmarkSchema"));
/**
 * The below  variable  is used to bookmark model from its schema.
 */
const BookmarkModel = mongoose_1.default.model("BookmarkModel", BookmarkSchema_1.default);
exports.default = BookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map